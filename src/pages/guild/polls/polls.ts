import {inject} from 'aurelia';
import {IRouteViewModel, route, Router} from '@aurelia/router-lite';

import {DiscordService} from '../../../services/discord-service';

@route({
    path: "polls",
    title: "Polls",
},)
@inject(DiscordService, Router)
export class Polls implements IRouteViewModel {
    constructor(private discordService: DiscordService, private router: Router) {
    }

    guild;
    guildId;
    polls = [];

    async attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
        [this.guild, this.polls] = await Promise.all([this.discordService.getDiscordServerInformation(this.guildId), this.discordService.getPolls(this.guildId)]);
    }
}
