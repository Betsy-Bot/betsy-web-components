import { IEventAggregator } from 'aurelia';
import { inject } from 'aurelia';
import { IRouteViewModel, route, Router } from '@aurelia/router-lite';

import { DiscordService } from '../../../../services/discord-service';

@route({
    path: 'messages',
    title: 'Messages',
})
@inject(IEventAggregator, DiscordService, Router)
export class Messages implements IRouteViewModel {
    constructor(
        private eventAggregator: IEventAggregator,
        private discordService: DiscordService,
        private router: Router
    ) {}

    guildId: string;
    params;
    forms;
    messages;

    async attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
        this.messages = await this.discordService.getResourceMessagesForGuild(
            this.guildId
        );
    }
}
