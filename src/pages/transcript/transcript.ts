import {Router} from "aurelia-router";
import {EventAggregator} from "aurelia-event-aggregator";
import {SessionService} from "services/session-service";
import {inject} from "aurelia-framework";
import {DiscordService} from "services/discord-service";

@inject(Router, EventAggregator, SessionService, DiscordService)
export class Transcript {
    constructor(private router: Router, private ea: EventAggregator, private sessionService: SessionService, private discordService: DiscordService) {
    }

    ticketId;
    user;
    ticket;

    async activate(params) {
        this.ticketId = params.ticketId;
    }

    async attached() {
        const isPublic = await this.discordService.getTranscriptPublic(this.ticketId);
        if (isPublic) {
            this.ticket = await this.discordService.getSupportTicketById(this.ticketId);
            return;
        }
        this.user = await this.sessionService.getUser();
        if (this.user) {
            this.ticket = await this.discordService.getSupportTicketById(this.ticketId);
        }
    }
}
