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
    messages;
    channels;
    loading = true;

    async activate(params) {
        this.guildId = params.guildId as string;
    }

    async attached() {
        try {
            [this.guild, this.messages, this.channels] = await Promise.all([
                await this.discordService.getDiscordServerInformation(this.guildId),
                await this.discordService.getDiscordSupportMessages(this.guildId),
                await this.discordService.getDiscordChannels(this.guildId)
            ])
            for (let message of this.messages) {
                const channel = this.channels.find(x => x.id == message.discordChannelId);
                message.name = channel.name;
            }
            this.featureActive = this.guild.activeFeatures.includes(this.discordService.SUPPORT_TICKETS);
        } catch(e) {
            throw e;
        } finally {
            this.loading = false;
        }
    }

    async updateActive(message) {
        let foundCommandIndex = this.messages.findIndex(x => x.name === message.name);
        if (foundCommandIndex >= 0) {
            if (message.active && window.confirm("This will re-create the message for you. Proceed?")) {
                //await this.discordService.toggleDiscordCommandActive(this.guildId, message.discordApplicationCommandId, this.messages[foundCommandIndex].active);
            } else if (!message.active && window.confirm("This will attempt to delete the message for you. Proceed?")) {
                //await this.discordService.toggleDiscordCommandActive(this.guildId, message.discordApplicationCommandId, this.messages[foundCommandIndex].active);
            }
            toast(`Active status has been updated for /${message.name}`, {severity: "success"})
        } else {
            toast("Error", {severity: "error"})
        }
    }

    goToMessage(message) {
        this.router.navigate(`/guild/${this.guildId}/support-tickets/${message.discordMessageId}`)
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
