import {inject} from 'aurelia';
import {IRouteViewModel, route, Router} from '@aurelia/router-lite';

import {DiscordService} from '../../../services/discord-service';

@route({
    path: "giveaways",
    title: "Giveaways",
})
@inject(DiscordService, Router)
export class Giveaways implements IRouteViewModel {
    constructor(private discordService: DiscordService, private router: Router) {
    }

    featureActive;
    guild;
    guildId;
    giveaways = [];

    async attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
        [this.guild, this.giveaways] = await Promise.all([this.discordService.getDiscordServerInformation(this.guildId), this.discordService.getGiveaways(this.guildId)]);
    }

    goTo(giveaway) {
        this.router.load(`/guild/${this.guildId}/giveaways/${giveaway.id}`);
    }
}
