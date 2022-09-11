import {EventAggregator} from "aurelia-event-aggregator";
import {DiscordService} from "services/discord-service";
import {Router} from "aurelia-router";
import {inject} from "aurelia-framework";
import './support-ticket.scss';

@inject(EventAggregator, DiscordService, Router)
export class SupportTicket {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }

    guildId: string;
    settingsId: string;
    supportTicketId: string;

    featureActive;
    supportTicket;

    async activate(params) {
        this.guildId = params.guildId as string;
        this.settingsId = params.settingsId as string;
        this.supportTicketId = params.ticketId as string;
    }

    async attached() {
        this.supportTicket = await this.discordService.getSupportTicket(this.guildId, this.settingsId, this.supportTicketId);
    }

    async closeTicket() {
        this.supportTicket = await this.discordService.closeSupportTicket(this.supportTicketId);
    }
}
