import { EventAggregator } from "aurelia-event-aggregator";
import { DiscordService } from "services/discord-service";
import { inject } from "aurelia-framework";
import { SendMessageToChannelRequest } from "services/models/discord";
import { toast } from "lets-toast";

@inject(EventAggregator, DiscordService)
export class SendMessage {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService) {
    }

    params;
    guild;
    guildId;
    channels;
    request: SendMessageToChannelRequest = {
        channelType: null,
        message: {
            content: 'Some Content',
            embeds: null
        }
    }
    channelId;

    activate(params) {
        this.params = params;
    }

    async attached() {
        this.guildId = this.params.guildId as string;
        [this.guild] = await Promise.all([
            this.discordService.getDiscordServerInformation(this.guildId)
        ])
    }

    async sendMessage() {
        if (!this.channelId) {
            toast("Please select a channel first!", { severity: "error" });
            return;
        }
        try {
            await this.discordService.sendMessageToChannel(this.guildId, this.channelId, this.request);
            toast("Message sent to channel(s)!");
        } catch(e) {
            toast("Failed to send message! Check audit channel if you have one setup.", { severity: "error" });
            console.log(e);
        }
    }
}
