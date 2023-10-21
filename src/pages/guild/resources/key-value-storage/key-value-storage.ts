import { inject } from 'aurelia';
import { IRouter,IRouteViewModel, route } from '@aurelia/router-lite';

import { DiscordService } from '../../../../services/discord-service';

@route({
    path: 'key-value-storage',
    title: 'Key Value Storage',
})
@inject(DiscordService, IRouter)
export class KeyValueStorage implements IRouteViewModel {
    constructor(
        private discordService: DiscordService,
        private router: IRouter
    ) {}

    guildId: string;
    params;
    items: any[];

    loading(params) {
        this.params = params;
        this.guildId = this.params.guildId;
    }

    async attached() {
        this.items = await this.discordService.getKeyValueCategories();
    }
}
