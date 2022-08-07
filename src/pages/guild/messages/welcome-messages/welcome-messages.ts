import {toast} from "lets-toast";
import {EventAggregator} from "aurelia-event-aggregator";
import {DiscordService} from "services/discord-service";
import {inject} from "aurelia-framework";
import {Router} from "aurelia-router";

@inject(EventAggregator, DiscordService, Router)
export class WelcomeMessages {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }

    featureActive;
    guild;
    guildId;
    params;
    messages = [];

    activate(params) {
        this.params = params;
    }

    async attached() {
        this.guildId = this.params.guildId as string;
        [this.guild, this.messages] = await Promise.all([
            this.discordService.getDiscordServerInformation(this.guildId),
            this.discordService.getDiscordWelcomeMessages()
        ])
        this.featureActive = this.guild.activeFeatures.includes(this.discordService.WELCOME_MESSAGES);
    }

    async toggleFeature() {
        if (this.featureActive) {
            this.guild.activeFeatures.push(this.discordService.WELCOME_MESSAGES);
            await this.discordService.setActiveFeaturesForDiscord(this.guildId, this.guild.activeFeatures);
        } else {
            this.guild.activeFeatures = this.guild.activeFeatures.filter(x => x !== this.discordService.WELCOME_MESSAGES);
            await this.discordService.setActiveFeaturesForDiscord(this.guildId, this.guild.activeFeatures);
        }
        toast(this.featureActive ? "Toggled feature on" : "Toggled feature off");
    }

    async updateActive(message) {
        let foundCommandIndex = this.messages.findIndex(x => x.name === message.name);
        this.messages[foundCommandIndex].active = !!this.messages[foundCommandIndex].active;
        if (foundCommandIndex >= 0) {
            await this.discordService.updateDiscordMessage(this.messages[foundCommandIndex]);
            toast(`Active status has been updated for ${message.name}`, {severity: "success"})
        } else {
            toast("Error", {severity: "error"})
        }
    }

    goTo(message) {
        this.router.navigate(`/guild/${this.guildId}/messages/welcome-messages/${message.id}`)
    }
}
