import {toast} from "lets-toast";
import {EventAggregator} from "aurelia-event-aggregator";
import {DiscordService} from "services/discord-service";
import {inject} from "aurelia-framework";
import {Router} from "aurelia-router";

@inject(EventAggregator, DiscordService, Router)
export class Giveaways {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }

    featureActive;
    guild;
    guildId;
    params;
    giveaways = [];

    activate(params) {
        this.params = params;
    }

    async attached() {
        this.guildId = this.params.guildId as string;
        [this.guild, this.giveaways] = await Promise.all([
            this.discordService.getDiscordServerInformation(this.guildId),
            this.discordService.getGiveaways(this.guildId)
        ])
    }

    goTo(giveaway) {
        this.router.navigate(`/guild/${this.guildId}/giveaways/${giveaway.id}`)
    }
}
