import { toast } from "lets-toast";
import { EventAggregator } from "aurelia-event-aggregator";
import { DiscordService } from "services/discord-service";
import { inject } from "aurelia-framework";
import { SessionService } from "../../../services/session-service";

@inject(EventAggregator, DiscordService, SessionService)
export class Verification {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private sessionService: SessionService) {
    }

    activate(params) {
        this.guildId = params.guildId;
    }

    params;
    guildId: string;
    featureActive;
    guild;
    selectedRole;
    isAdmin: boolean;

    async attached() {
        [this.guild, this.isAdmin] = await Promise.all([
            await this.discordService.getDiscordServerInformation(this.guildId),
            await this.sessionService.isAdmin(this.guildId)
        ])
        this.featureActive = this.guild.activeFeatures.includes(this.discordService.VERIFICATION)
        if (!this.guild.globalSettings) {
            this.guild.globalSettings = {};
            if (!this.guild.globalSettings.verificationSettings) {
                this.guild.globalSettings.verificationSettings = {
                    blockAlts: false,
                    requireLogin: false
                }
            }
        }
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
        this.guild.globalSettings.verificationSettings.verifiedRoleId = this.selectedRole.id;
        await this.discordService.updateGlobalSettingsForGuild(this.guild, this.guildId);
    }
}
