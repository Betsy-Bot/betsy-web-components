import { inject } from 'aurelia';
import { Params, route } from '@aurelia/router-lite';

import { DiscordService } from '../../services/discord-service';
import { SessionService } from '../../services/session-service';

@route({
    path: 'transcript/:ticketId',
})
@inject(DiscordService, SessionService)
export class Transcript {
    constructor(
        private discordService: DiscordService,
        private sessionService: SessionService
    ) {}

    ticketId: string;
    user;
    ticket;
    isPublic: boolean;

    loading(params: Params) {
        this.ticketId = params.ticketId ?? '';
    }

    async attached() {
        this.isPublic = await this.discordService.getTranscriptPublic(
            this.ticketId
        );
        if (this.isPublic) {
            this.ticket = await this.discordService.getSupportTicketById(
                this.ticketId
            );
            return;
        }
        this.user = await this.sessionService.getUser();
        if (this.user) {
            this.ticket = await this.discordService.getSupportTicketById(
                this.ticketId
            );
        }
    }
}
