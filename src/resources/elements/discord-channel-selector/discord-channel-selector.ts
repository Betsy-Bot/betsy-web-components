import { bindable, BindingMode, capture, containerless, inject } from 'aurelia';

import { DiscordService } from '../../../services/discord-service';

@inject(DiscordService)
@capture()
@containerless()
export class DiscordChannelSelector {
    constructor(private discordService: DiscordService) {}

    @bindable({ mode: BindingMode.twoWay }) channelId: string;
    @bindable type: number;
    @bindable label: string;
    @bindable required = false;
    @bindable includeNull: boolean;
    @bindable disabled: boolean;

    channels;

    async attached() {
        this.channels = await this.discordService.getDiscordChannels();
    }

    matchesType(channel: any) {
        return this.type != null ? channel.type === this.type : true;
    }
}
