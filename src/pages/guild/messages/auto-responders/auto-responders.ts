import { toast } from "lets-toast";
import { EventAggregator } from "aurelia-event-aggregator";
import { DiscordService } from "../../../../services/discord-service";
import { Router } from "aurelia-router";
import { inject } from "aurelia-framework";

@inject(EventAggregator, DiscordService, Router)
export class AutoResponders {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }

    guildId: string;
    responders;
    guild;
    featureActive;

    async activate(params) {
        this.guildId = params.guildId as string;
    }
    
    async attached() {
        [this.responders, this.guild] = await Promise.all([
            await this.discordService.getAutoResponders(this.guildId),
            this.discordService.getDiscordServerInformation(this.guildId)
        ])
        this.featureActive = this.guild.activeFeatures.includes(this.discordService.AUTO_RESPONDERS);
    }

    async updateActive(responder) {
        const foundCommandIndex = this.responders.findIndex(x => x.name === responder.name);
        this.responders[foundCommandIndex].active = !!this.responders[foundCommandIndex].active;
        if (foundCommandIndex >= 0) {
            await this.discordService.updateAutoResponder(this.responders[foundCommandIndex]);
            toast(`Active status has been updated for /${responder.name}`, { severity: "success" })
        } else {
            toast("Error", { severity: "error" })
        }
    }

    goTo(responder) {
        this.router.navigate(`/guild/${this.guildId}/messages/auto-responders/${responder.id}`)
    }

    async toggleFeature() {
        if (this.featureActive) {
            this.guild.activeFeatures.push(this.discordService.AUTO_RESPONDERS);
            await this.discordService.setActiveFeaturesForDiscord(this.guildId, this.guild.activeFeatures);
        } else {
            this.guild.activeFeatures = this.guild.activeFeatures.filter(x => x !== this.discordService.AUTO_RESPONDERS);
            await this.discordService.setActiveFeaturesForDiscord(this.guildId, this.guild.activeFeatures);
        }
        toast(this.featureActive ? "Toggled feature on" : "Toggled feature off");
    }
}
