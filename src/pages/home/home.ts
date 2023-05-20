import { IEventAggregator, inject } from "aurelia";
import { IRouter, IRouteViewModel, route } from "@aurelia/router-lite";

import { SessionService } from "../../services/session-service";
import { UserService } from "../../services/user-service";
import { WebhookService } from "../../services/websocket-service";
@route({
    path: ["", "login"],
    title: "Home",
})
@inject(SessionService, UserService, WebhookService, IRouter, IEventAggregator)
export class Home implements IRouteViewModel {
    constructor(
        private sessionService: SessionService,
        private userService: UserService,
        private webhookService: WebhookService,
        private router: IRouter,
        private ea: IEventAggregator
    ) {}

    user;
    private managedGuilds;
    private otherGuilds;
    connection;
    isLoading = false;
    userGuilds;

    async attached() {
        this.user = await this.sessionService.getUser();

        this.setServerIds();
        this.userGuilds = await this.userService.getGuilds();
        await this.loadGuilds();

        this.connection = this.webhookService.subscribeToGuildInvite();
        await this.connection.start();
        this.connection.on("BotInvited", async (id, name, description) => {
            await this.router.load(`guild/${id}`);
        });
        this.isLoading = false;

        this.ea.subscribe("user-updated", (payload) => {
            window.location.reload();
        });
    }

    setServerIds() {
        if (this.user?.adminedServers) {
            for (const server of this.user?.adminedServers) {
                server.id = server.guildId;
            }
        }
    }

    async loadGuilds() {
        for (const guild of this.userGuilds) {
            guild.icon_extension = guild.icon?.startsWith("a_")
                ? "gif"
                : "webp";
            guild.can_add = guild.owner || (guild.permissions & 0x8) == 0x8;
        }

        this.managedGuilds = this.userGuilds.filter((g) => g.can_add);
        this.otherGuilds = this.userGuilds.filter((g) => !g.can_add);

        if (this.user?.adminedServers) {
            for (let server of this.user?.adminedServers) {
                const foundServerIndex = this.userGuilds.findIndex(
                    (x) => x.id == server.guildId
                );
                if (foundServerIndex >= 0) {
                    server.icon = this.userGuilds[foundServerIndex].icon;
                    server.icon_extension = server.icon?.startsWith("a_")
                        ? "gif"
                        : "webp";
                }
            }
        }
    }

    showInManagedServers(server): boolean {
        if (!this.user.adminedServers) {
            return true;
        }
        for (const adminedServer of this.user.adminedServers) {
            if (server.id == adminedServer.id) {
                return false;
            }
        }
        return true;
    }
}
