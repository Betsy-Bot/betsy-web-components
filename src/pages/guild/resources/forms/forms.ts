import { Router } from 'aurelia-router';
import { inject } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";
import { DiscordService } from 'services/discord-service';

@inject(EventAggregator, DiscordService, Router)
export class GuildForms {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }

    guildId: string;
    params;
    forms;

    activate(params) {
        this.params = params;
        this.guildId = this.params.guildId;
    }

    async attached() {
        this.forms = await this.discordService.getDiscordForms(this.guildId);
    }

    goToForm(item) {
        this.router.navigate(`/guild/${this.guildId}/resources/forms/${item.id}`)
    }
}
