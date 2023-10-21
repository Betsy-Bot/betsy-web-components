import { inject } from 'aurelia';
import { IRouteViewModel, route } from '@aurelia/router-lite';

import { DiscordService } from '../../../../services/discord-service';
import { ISendMessageToChannelRequest } from '../../../../services/models/discord';

import { toast } from 'lets-toast';

@route({
    path: 'send-message',
    title: 'Send Message',
},)
@inject(DiscordService)
export class SendMessage implements IRouteViewModel {
    constructor(private discordService: DiscordService) {
    }

    guild;
    guildId;
    channels;
    request: ISendMessageToChannelRequest = {
        channelType: null,
        message: {
            content: 'Some Content',
            embeds: null,
        },
    };
    channelId;

    async attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
        [this.guild] = await Promise.all([this.discordService.getDiscordServerInformation(this.guildId)]);
    }

    async sendMessage() {
        if (!this.channelId) {
            toast('Please select a channel first!', { severity: 'error' });
            return;
        }
        try {
            await this.discordService.sendMessageToChannel(this.guildId, this.channelId, this.request);
            toast('Message sent to channel(s)!');
        } catch (e) {
            toast('Failed to send message! Check audit channel if you have one setup.', { severity: 'error' });
            console.log(e);
        }
    }
}
