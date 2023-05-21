import { bindable, BindingMode,inject } from "aurelia";

import { DiscordService } from "../../../services/discord-service";

@inject(DiscordService)
export class DiscordChannelSelector {
    constructor(private discordService: DiscordService) {}
    @bindable({ mode: BindingMode.twoWay }) channelId: string;
    @bindable type: number;
    @bindable label;
    @bindable required = false;
    @bindable class;
    @bindable includeNull;
    @bindable disabled;

    channels;

    async attached() {
        this.channels = await this.discordService.getDiscordChannels();
    }

    matchesType(channel) {
        return this.type != null ? channel.type === this.type : true;
    }
}
