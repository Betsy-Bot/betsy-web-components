import { IEventAggregator } from 'aurelia';
import { bindable, inject } from 'aurelia';
import { IRouteViewModel, route, Router } from '@aurelia/router-lite';

import { DiscordService } from '../../../../../services/discord-service';

import { toast } from 'lets-toast';

@route({
    path: 'welcome-messages/:messageId',
    title: 'Manage Welcome Message',
})
@inject(IEventAggregator, DiscordService, Router)
export class ManageWelcomeMessage implements IRouteViewModel {
    constructor(
        private eventAggregator: IEventAggregator,
        private discordService: DiscordService,
        private router: Router
    ) {}

    loading(params) {
        this.messageId = params.messageId;
    }

    guildId: string;
    @bindable message;
    messageId;
    isNew: boolean;
    messageTemplate = {
        name: '',
        discordChannelId: '',
        discordServerId: '',
        type: 3,
    };

    types = [
        {
            displayName: 'Welcome Channel Message',
            value: 3
        },
        {
            displayName: 'Welcome Direct Message',
            value: 4
        }
    ]

    async attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
        if (!this.messageId || this.messageId == 0) {
            this.isNew = true;
            this.message = this.messageTemplate;
        } else {
            this.message = await this.discordService.getDiscordMessageById(
                this.messageId
            );
        }
        this.messageTemplate.discordServerId =
            this.discordService.getLocalGuild().id;
    }

    async save() {
        if (!this.message.discordChannelId && this.message.type == 3) {
            toast('Missing Channel ID or Message Type');
            return;
        }
        try {
            if (this.isNew) {
                this.message = await this.discordService.createDiscordMessage(
                    this.message
                );
            } else {
                this.message = await this.discordService.updateDiscordMessage(
                    this.message
                );
            }
            toast(`Welcome Message ${this.isNew ? 'Created' : 'Updated'}!`);
        } catch (e) {
            console.log(e);
            toast('Failed to create message', { severity: 'error' });
        }
    }
}
