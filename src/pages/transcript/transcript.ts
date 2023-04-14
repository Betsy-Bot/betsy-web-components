import { inject } from 'aurelia';
import { Params } from '@aurelia/router-lite';

import { DiscordService } from '../../services/discord-service';
import { SessionService } from '../../services/session-service';

@inject(DiscordService, SessionService)
export class Transcript {
    constructor(private discordService: DiscordService, private sessionService: SessionService) {}

    ticketId: string;
    user;
    ticket;

    activate(params: Params) {
        this.ticketId = params.ticketId;
    }

    async attached() {
        const isPublic: boolean = await this.discordService.getTranscriptPublic(this.ticketId);
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
