import {inject, bindable} from "aurelia-framework";
import {DiscordService} from "../../../services/discord-service";

@inject(DiscordService)
export class DiscordChannelSelector {
    constructor(private discordService: DiscordService) {
    }

    @bindable guildId: string;
    @bindable channelId: string;
    @bindable type: number;
    @bindable label;
    @bindable required: boolean = false;

    channels;

    async attached() {
        this.channels = await this.discordService.getDiscordChannels(this.guildId);
    }

    matchesType(channel) {
        return this.type != null ? channel.type === this.type : true;
    }
}
