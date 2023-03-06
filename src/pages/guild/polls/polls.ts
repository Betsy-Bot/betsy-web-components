import { EventAggregator } from "aurelia-event-aggregator";
import { DiscordService } from "services/discord-service";
import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";

@inject(EventAggregator, DiscordService, Router)
export class Polls {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }

    guild;
    guildId;
    params;
    polls = [];

    activate(params) {
        this.params = params;
    }

    async attached() {
        this.guildId = this.params.guildId as string;
        [this.guild, this.polls] = await Promise.all([
            this.discordService.getDiscordServerInformation(this.guildId),
            this.discordService.getPolls(this.guildId)
        ])
    }

    goTo(giveaway) {
        this.router.navigate(`/guild/${this.guildId}/polls/${giveaway.id}`)
    }
}
