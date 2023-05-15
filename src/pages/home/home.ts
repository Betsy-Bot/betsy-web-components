import { inject } from "aurelia";
import { IRouter, IRouteViewModel, route } from "@aurelia/router-lite";

import { SessionService } from "../../services/session-service";
import { UserService } from "../../services/user-service";
import { WebhookService } from "../../services/websocket-service";
@route({
    path: ["", "login"],
    title: "Home",
})
@inject(SessionService, UserService, WebhookService, IRouter)
export class Home implements IRouteViewModel {
    constructor(
        private sessionService: SessionService,
        private userService: UserService,
        private webhookService: WebhookService,
        private router: IRouter
    ) {}

    user;
    private managedGuilds;
    private otherGuilds;
    connection;
    isLoading = false;

    async attached() {
        this.user = await this.sessionService.getUser();

        if (this.user?.adminedServers) {
            // eslint-disable-next-line no-unsafe-optional-chaining
            for (const server of this.user?.adminedServers) {
                server.id = server.guildId;
            }
        }

        const userGuilds = await this.userService.getGuilds();
        for (const guild of userGuilds) {
            guild.icon_extension = guild.icon?.startsWith("a_")
                ? "gif"
                : "webp";
            guild.can_add = guild.owner || (guild.permissions & 0x8) == 0x8;
        }

        for (let server of this.user?.adminedServers) {
            const foundServerIndex = userGuilds.findIndex(
                (x) => x.id == server.guildId
            );
            if (foundServerIndex >= 0) {
                server.icon = userGuilds[foundServerIndex].icon;
                server.icon_extension = server.icon?.startsWith("a_")
                    ? "gif"
                    : "webp";
            }
            console.log(foundServerIndex);
        }

        this.managedGuilds = userGuilds.filter((g) => g.can_add);
        this.otherGuilds = userGuilds.filter((g) => !g.can_add);

        this.connection = this.webhookService.subscribeToGuildInvite();
        await this.connection.start();
        this.connection.on("BotInvited", async (id, name, description) => {
            await this.router.load(`guild/${id}`);
        });
        this.isLoading = false;
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
