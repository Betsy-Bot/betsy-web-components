import { inject } from "aurelia";
import { IRouteViewModel, route } from "@aurelia/router-lite";

import { DiscordService } from "../../../../../../services/discord-service";

@route({
    path: "support-tickets/:supportTicketSettingsId/submissions/:ticketId",
    title: "View Support Ticket",
})
@inject(DiscordService)
export class SupportTicket implements IRouteViewModel {
    constructor(private discordService: DiscordService) {}

    guildId: string;
    settingsId: string;
    supportTicketId: string;

    featureActive;
    supportTicket;
    closing = false;

    async loading(params) {
        this.settingsId = params.supportTicketSettingsId as string;
        this.supportTicketId = params.ticketId as string;
    }

    async attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
        this.supportTicket = await this.discordService.getSupportTicket(
            this.guildId,
            this.settingsId,
            this.supportTicketId
        );
    }

    async closeTicket() {
        this.closing = true;
        this.supportTicket = await this.discordService.closeSupportTicket(
            this.supportTicketId
        );
        this.closing = false;
    }
}
