import {EventAggregator} from "aurelia-event-aggregator";
import {DiscordService} from "services/discord-service";
import {inject} from "aurelia-framework";
import {botClientId, verifyRedirectUrl} from "environment";
import {toast} from "lets-toast";
import {SessionService} from "services/session-service";

@inject(EventAggregator, DiscordService, SessionService)
export class Verify {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private sessionService: SessionService) {
    }

    loading = true;
    code;
    success;

    async activate(params) {
        if (params.code) {
            this.code = params.code as string;
        } else {
            this.guildId = params.guildId;
            this.userId = params.userId;
            this.response = await this.discordService.getRequiresLogin(this.guildId);
        }
    }

    async attached() {
        if (this.code) {
            try {
                await this.sessionService.loginWithOAuthCode(this.code, verifyRedirectUrl());
                await this.discordService.verifyLogin();
            } catch(e) {
                toast("Failed to exchange code", {severity: 'error'});
            }
        } else {
            this.success = await this.discordService.verifyUser(this.guildId, this.userId);
            if (this.success == null) {
                toast("Failed to attempt verification.", {severity: 'error'});
            }
        }
        setTimeout(() => {
            this.loading = false;
        }, 200)
    }

    params;
    guildId: string;
    userId: string;
    response;

    get discordOauthUrl() {
        return `https://discord.com/api/oauth2/authorize?client_id=${botClientId()}&redirect_uri=${verifyRedirectUrl()}&response_type=code&scope=identify%20email%20guilds`;
    }
}
