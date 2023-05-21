import { inject } from "aurelia";
import { IRouteViewModel, route } from "@aurelia/router-lite";

import { DiscordService } from "../../../services/discord-service";
import { SessionService } from "../../../services/session-service";

import { toast } from "lets-toast";

@route({
    path: "verification",
    title: "Verification Settings",
})
@inject(DiscordService, SessionService)
export class Verification implements IRouteViewModel {
    constructor(
        private discordService: DiscordService,
        private sessionService: SessionService
    ) {}

    guildId: string;
    featureActive;
    guild;
    selectedRole;
    isAdmin: boolean;

    async attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
        [this.guild, this.isAdmin] = await Promise.all([
            await this.discordService.getDiscordServerInformation(this.guildId),
            await this.sessionService.isAdmin(this.guildId),
        ]);
        this.featureActive = this.guild.activeFeatures.includes(
            this.discordService.VERIFICATION
        );
        if (!this.guild.globalSettings) {
            this.guild.globalSettings = {};
            if (!this.guild.globalSettings.verificationSettings) {
                this.guild.globalSettings.verificationSettings = {
                    blockAlts: false,
                    requireLogin: false,
                };
            }
        }
    }

    async updateKeys() {
        await this.discordService.updateApiKyesForGuild(
            this.guild,
            this.guildId
        );
    }

    async toggleFeature() {
        if (this.featureActive) {
            this.guild.activeFeatures.push(this.discordService.VERIFICATION);
            await this.discordService.setActiveFeaturesForDiscord(
                this.guildId,
                this.guild.activeFeatures
            );
        } else {
            this.guild.activeFeatures = this.guild.activeFeatures.filter(
                (x) => x !== this.discordService.VERIFICATION
            );
            await this.discordService.setActiveFeaturesForDiscord(
                this.guildId,
                this.guild.activeFeatures
            );
        }
        toast(
            this.featureActive ? "Toggled feature on" : "Toggled feature off"
        );
    }

    async save() {
        await this.discordService.updateGlobalSettingsForGuild(
            this.guild,
            this.guildId
        );
        toast("Updated Settings", { severity: "success" });
    }
}
