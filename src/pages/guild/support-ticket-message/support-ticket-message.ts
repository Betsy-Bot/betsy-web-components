import {EventAggregator} from "aurelia-event-aggregator";
import {DiscordService} from "../../../services/discord-service";
import {Router} from "aurelia-router";
import {inject} from "aurelia-framework";
import {toast} from "lets-toast";

@inject(EventAggregator, DiscordService, Router)
export class SupportTicketMessage {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }

    guildId: string;
    guild;

    featureActive;
    supportTickets;
    channels;
    loading = true;

    async activate(params) {
        this.guildId = params.guildId as string;
    }

    async attached() {
        try {
            [this.guild, this.supportTickets, this.channels] = await Promise.all([
                await this.discordService.getDiscordServerInformation(this.guildId),
                await this.discordService.getDiscordSupportTicketSettings(),
                await this.discordService.getDiscordChannels(this.guildId)
            ])
            for (let ticket of this.supportTickets) {
                if (ticket.identifier ) continue
                const channel = this.channels.find(x => x.id == ticket.discordMessage.discordChannelId);
                ticket.identifier = 'Message In Channel - #' + channel.name;
            }
            this.featureActive = this.guild.activeFeatures.includes(this.discordService.SUPPORT_TICKETS);
        } catch(e) {
            throw e;
        } finally {
            this.loading = false;
        }
    }

    async updateActive(event, ticket) {
        event.stopPropagation();
        ticket.discordMessage.active = !ticket.discordMessage.active;
        if (ticket.discordMessage.active && window.confirm("This will re-create the message for you. Proceed?")) {
            await this.discordService.toggleDiscordMessageActiveStatus(ticket.discordMessage.id, ticket.discordMessage.active);
            toast(`Active status has been updated for support ticket message`, {severity: "success"})
        } else if (!ticket.discordMessage.active && window.confirm("This will attempt to delete the message for you. Proceed?")) {
            await this.discordService.toggleDiscordMessageActiveStatus(ticket.discordMessage.id, ticket.discordMessage.active);
            toast(`Active status has been updated for support ticket message`, {severity: "success"})
        }
    }

    goToMessage(ticket) {
        this.router.navigate(`/guild/${this.guildId}/support-tickets/${ticket.id}`)
    }

    async toggleFeature() {
        if (this.featureActive) {
            this.guild.activeFeatures.push(this.discordService.SUPPORT_TICKETS);
            await this.discordService.setActiveFeaturesForDiscord(this.guildId, this.guild.activeFeatures);
        } else {
            this.guild.activeFeatures = this.guild.activeFeatures.filter(x => x !== this.discordService.SUPPORT_TICKETS);
            await this.discordService.setActiveFeaturesForDiscord(this.guildId, this.guild.activeFeatures);
        }
        toast(this.featureActive ? "Toggled feature on" : "Toggled feature off");
    }
}
