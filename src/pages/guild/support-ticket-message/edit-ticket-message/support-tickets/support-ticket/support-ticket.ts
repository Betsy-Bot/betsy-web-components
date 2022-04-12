import {EventAggregator} from "aurelia-event-aggregator";
import {DiscordService} from "services/discord-service";
import {Router} from "aurelia-router";
import {inject} from "aurelia-framework";
import {toast} from "lets-toast";
import './support-ticket.scss';

@inject(EventAggregator, DiscordService, Router)
export class SupportTicket {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }

    guildId: string;
    discordMessageId: string;
    supportTicketId: string;

    featureActive;
    supportTicket;

    async activate(params) {
        this.guildId = params.guildId as string;
        this.discordMessageId = params.discordMessageId as string;
        this.supportTicketId = params.ticketId as string;
        this.supportTicket = await this.discordService.getSupportTicket(this.guildId, this.discordMessageId, this.supportTicketId);
    }

    attached() {
        this.supportTicket.transcript.messages.reverse();
    }
}
