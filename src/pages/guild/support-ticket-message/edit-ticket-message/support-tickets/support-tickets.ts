import {EventAggregator} from "aurelia-event-aggregator";
import {DiscordService} from "services/discord-service";
import {Router} from "aurelia-router";
import {inject} from "aurelia-framework";
import {toast} from "lets-toast";

@inject(EventAggregator, DiscordService, Router)
export class SupportTickets {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }

    guildId: string;
    settingsId: string;

    featureActive;
    supportTickets;

    async activate(params) {
        this.guildId = params.guildId as string;
        this.settingsId = params.settingsId as string;
    }

    async attached() {
        this.supportTickets = await this.discordService.getDiscordMessageSupportTickets(this.guildId, this.settingsId);
    }

    goToSubmission(submission) {
        this.router.navigate(`/guild/${this.guildId}/support-tickets/${this.settingsId}/submissions/${submission.id}`)
    }
}
