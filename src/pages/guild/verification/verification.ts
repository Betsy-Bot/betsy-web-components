import {toast} from "lets-toast";
import {EventAggregator} from "aurelia-event-aggregator";
import {DiscordService} from "services/discord-service";
import {Router} from "aurelia-router";
import {inject} from "aurelia-framework";

@inject(EventAggregator, DiscordService, Router)
export class Verification {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }

    activate(params) {
        this.guildId = params.guildId;
    }

    params;
    guildId: string;
    featureActive;
    guild;
    selectedRole;

    async attached() {
        [this.guild] = await Promise.all([
            await this.discordService.getDiscordServerInformation(this.guildId)
        ])
        this.featureActive = this.guild.activeFeatures.includes(this.discordService.VERIFICATION);
    }

    async updateKeys() {
        await this.discordService.updateApiKyesForGuild(this.guild, this.guildId);
    }

    async toggleFeature() {
        if (this.featureActive) {
            this.guild.activeFeatures.push(this.discordService.VERIFICATION);
            await this.discordService.setActiveFeaturesForDiscord(this.guildId, this.guild.activeFeatures);
        } else {
            this.guild.activeFeatures = this.guild.activeFeatures.filter(x => x !== this.discordService.VERIFICATION);
            await this.discordService.setActiveFeaturesForDiscord(this.guildId, this.guild.activeFeatures);
        }
        toast(this.featureActive ? "Toggled feature on" : "Toggled feature off");
    }

    async save() {
        await this.discordService.updateVerifiedRole(this.guildId, this.selectedRole.id);
    }
}
