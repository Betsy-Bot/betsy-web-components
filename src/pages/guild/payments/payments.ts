import { DiscordService } from "../../../services/discord-service";
import { Router } from "aurelia-router";
import { SessionService } from "../../../services/session-service";
import { inject } from "aurelia-framework";
import { toast } from "lets-toast";

@inject(DiscordService, Router, SessionService)
export class Payments {
    constructor(private discordService: DiscordService, private router: Router, private sessionService: SessionService) {
    }

    params;
    guildId;
    guild;
    featureActive;

    async activate(params) {
        this.params = params;
        this.guildId = this.params.guildId;
    }

    async attached() {
        [this.guild] = await Promise.all([
            await this.discordService.getDiscordServerInformation(this.guildId)
        ]);
        this.featureActive = this.guild.activeFeatures.includes(this.discordService.PAYMENTS);
    }

    async updateKeys() {
        await this.discordService.updateApiKyesForGuild(this.guild, this.guildId);
    }

    async toggleFeature() {
        if (this.featureActive) {
            this.guild.activeFeatures.push(this.discordService.PAYMENTS);
            await this.discordService.setActiveFeaturesForDiscord(this.guildId, this.guild.activeFeatures);
        } else {
            this.guild.activeFeatures = this.guild.activeFeatures.filter(x => x !== this.discordService.PAYMENTS);
            await this.discordService.setActiveFeaturesForDiscord(this.guildId, this.guild.activeFeatures);
        }
        toast(this.featureActive ? "Toggled feature on" : "Toggled feature off");
    }
}
