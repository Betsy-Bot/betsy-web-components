import { inject } from 'aurelia';
import { IEventAggregator } from 'aurelia';
import { route, Router } from '@aurelia/router-lite';
import { IRouteViewModel } from '@aurelia/router-lite';

import { DiscordService } from '../../../../services/discord-service';

import { toast } from 'lets-toast';

@route({
    path: 'channel-backups',
    title: 'Channel Backups',
})
@inject(IEventAggregator, DiscordService, Router)
export class ChannelBackups implements IRouteViewModel {
    constructor(
        private eventAggregator: IEventAggregator,
        private discordService: DiscordService,
        private router: Router
    ) {}
    guildId: string;
    channelBackups: any[];
    newChannel: string;

    createChannelBackupDialog;

    async attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
        this.channelBackups = await this.discordService.getChannelBackups();
    }

    async handleCreateDialog(event) {
        try {
            if (event.detail.action == 'ok') {
                const createdChannel =
                    await this.discordService.createDiscordChannelBackup({
                        channelId: this.newChannel,
                        discordServerId: this.discordService.getLocalServerId(),
                    });
                toast('Created Channel Backup. You must refresh to view it.', {
                    severity: 'success',
                });
            }
        } catch (e) {
            toast('Failed to create channel backup', { severity: 'error' });
        }
    }
}
