import { inject } from 'aurelia';
import { IRouteViewModel, route, Router } from '@aurelia/router-lite';
import { watch } from '@aurelia/runtime-html';

import { DiscordService } from '../../../services/discord-service';

import { toast } from 'lets-toast';

@route({
    path: "support-tickets",
    title: "Support Tickets",
},)
@inject(DiscordService, Router)
export class SupportTicketMessage implements IRouteViewModel {
    constructor(private discordService: DiscordService, private router: Router) {
    }

    guildId: string;
    guild;

    featureActive;
    supportTickets;
    didLoad = true;

    async binding() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
        [this.guild, this.supportTickets] = await Promise.all([
            await this.discordService.getDiscordServerInformation(this.guildId),
            await this.discordService.getDiscordSupportTicketSettings()
        ]);
        for (const ticket of this.supportTickets) {
            if (ticket.discordMessage.active) {
                ticket.active = true;
            }
        }
        this.featureActive = this.guild.activeFeatures.includes(this.discordService.SUPPORT_TICKETS);
    }

    async updateActive(ticket) {
        ticket.discordMessage.active = !ticket.discordMessage.active;
        if (ticket.discordMessage.active && window.confirm('This will re-create the message for you. Proceed?')) {
            await this.discordService.toggleDiscordMessageActiveStatus(ticket.discordMessage.id, ticket.discordMessage.active);
            toast(`Active status has been updated for support ticket message`, { severity: 'success' });
        } else if (!ticket.discordMessage.active && window.confirm('This will attempt to delete the message for you. Proceed?')) {
            await this.discordService.toggleDiscordMessageActiveStatus(ticket.discordMessage.id, ticket.discordMessage.active);
            toast(`Active status has been updated for support ticket message`, { severity: 'success' });
        }
    }

    async goToMessage(ticket) {
        await this.router.load(`/guild/${this.guildId}/support-tickets/${ticket.id}`);
    }

    @watch('featureActive')
    async toggleFeature() {
        if (this.featureActive) {
            this.guild.activeFeatures.push(this.discordService.SUPPORT_TICKETS);
            await this.discordService.setActiveFeaturesForDiscord(this.guildId, this.guild.activeFeatures);
        } else {
            this.guild.activeFeatures = this.guild.activeFeatures.filter((x) => x !== this.discordService.SUPPORT_TICKETS);
            await this.discordService.setActiveFeaturesForDiscord(this.guildId, this.guild.activeFeatures);
        }
        toast(this.featureActive ? 'Toggled feature on' : 'Toggled feature off');
    }
}
