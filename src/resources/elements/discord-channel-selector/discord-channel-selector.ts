import { inject, bindable } from "aurelia";
import { DiscordService } from "../../../services/discord-service";

@inject(DiscordService)
export class DiscordChannelSelector {
    constructor(private discordService: DiscordService) {}

    @bindable guildId: string;
    @bindable channelId: string;
    @bindable type: number;
    @bindable label;
    @bindable required = false;
    @bindable class;
    @bindable includeNull;
    @bindable disabled;

    channels;

    async attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
        this.channels = await this.discordService.getDiscordChannels(
            this.guildId
        );
    }

    matchesType(channel) {
        return this.type != null ? channel.type === this.type : true;
    }
}
