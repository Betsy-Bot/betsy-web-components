import { inject } from 'aurelia';
import { IEventAggregator } from 'aurelia';
import { Params, route } from '@aurelia/router-lite';
import { IRouter,IRouteViewModel } from '@aurelia/router-lite';

import { DiscordService } from '../../../../../services/discord-service';

import { toast } from 'lets-toast';

@route({
    path: 'channel-backups/:backupId',
    title: 'Channel Backup',
})
@inject(IEventAggregator, DiscordService, IRouter)
export class ChannelBackup implements IRouteViewModel {
    constructor(
        private eventAggregator: IEventAggregator,
        private discordService: DiscordService,
        private router: IRouter
    ) {}
    guildId: string;
    channelBackup: any;
    backupId: string;

    loading(params: Params) {
        this.backupId = params.backupId;
    }
    async attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
        this.channelBackup = await this.discordService.getDiscordChannelBackup(
            this.backupId
        );
    }

    async deleteBackup(event) {
        if (event.detail.action == 'ok') {
            await this.discordService.deleteDiscordChannelBackup(
                this.channelBackup.id
            );
            toast('Deleted Channel Backup');
            await this.router.load('../channel-backups', { context: this });
        }
    }
}
