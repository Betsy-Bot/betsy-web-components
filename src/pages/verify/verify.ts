import { DiscordService } from "../../services/discord-service";
import { inject } from "aurelia";
import { botClientId, verifyRedirectUrl } from "../../environment";
import { toast } from "lets-toast";
import { SessionService } from "../../services/session-service";
import { IRouteViewModel, Params, route } from "@aurelia/router-lite";

@route({
    path: ["verify", "verify/:userId"],
})
@inject(DiscordService, SessionService)
export class Verify implements IRouteViewModel {
    constructor(
        private discordService: DiscordService,
        private sessionService: SessionService
    ) {}

    isLoading = true;
    code;
    success;

    async loading(params: Params) {
        if (params.code) {
            this.code = params.code as string;
        } else {
            this.userId = params.userId;
        }
    }

    async binding() {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        this.guildId = params.guildId;
        this.response = await this.discordService.getRequiresLogin(
            this.guildId
        );
    }

    async attached() {
        if (this.code) {
            try {
                await this.sessionService.loginWithOAuthCode(
                    this.code,
                    verifyRedirectUrl()
                );
                await this.discordService.verifyLogin();
            } catch (e) {
                toast("Failed to exchange code", { severity: "error" });
            }
        } else {
            this.success = await this.discordService.verifyUser(
                this.guildId,
                this.userId
            );
            if (this.success == null) {
                toast("Failed to attempt verification.", { severity: "error" });
            }
            console.log("success");
        }
        setTimeout(() => {
            this.isLoading = false;
        }, 200);
    }

    params;
    guildId: string;
    userId: string;
    response;

    get discordOauthUrl() {
        return `https://discord.com/api/oauth2/authorize?client_id=${botClientId()}&redirect_uri=${verifyRedirectUrl()}&response_type=code&scope=identify%20email%20guilds`;
    }
}
