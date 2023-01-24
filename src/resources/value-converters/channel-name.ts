import {DiscordService} from "../../services/discord-service";
import {autoinject} from "aurelia-framework";

@autoinject
export class ChannelNameValueConverter {
    constructor(private discordService: DiscordService) {
    }
    public toView(value: any) {
        if (!value) {
            return;
        }
        const channels = this.discordService.guildChannels;
        const channel = channels.find(x => x.id == value);
        if (channel) {
            return channel.name;
        }
        return value;
    }
}