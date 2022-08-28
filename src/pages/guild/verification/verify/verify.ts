import {EventAggregator} from "aurelia-event-aggregator";
import {DiscordService} from "services/discord-service";
import {inject} from "aurelia-framework";
import {botClientId, verifyRedirectUrl} from "../../../../environment";

@inject(EventAggregator, DiscordService)
export class Verify {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService) {
    }

    async activate(params) {
        this.guildId = params.guildId;
        this.userId = params.userId;
        this.response = await this.discordService.getRequiresLogin(this.guildId);
    }

    async attached() {
        await this.discordService.verifyUser(this.guildId, this.userId);
    }

    params;
    guildId: string;
    userId: string;
    response;

    get discordOauthUrl() {
        return `https://discord.com/api/oauth2/authorize?client_id=${botClientId()}&redirect_uri=${verifyRedirectUrl()}&response_type=code&scope=identify%20email%20guilds`;
    }
}
