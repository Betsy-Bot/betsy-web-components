import { DiscordService } from "services/discord-service";
import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { toast } from "lets-toast";

@inject(DiscordService, Router)
export class ThreadChannels {
    constructor(private discordService: DiscordService, private router: Router) {
    }

    guild;
    guildId;
    params;
    threadChannels = [];
    featureActive: boolean;

    activate(params) {
        this.params = params;
    }

    async attached() {
        this.guildId = this.params.guildId as string;
        [this.guild, this.threadChannels] = await Promise.all([
            this.discordService.getDiscordServerInformation(this.guildId),
            this.discordService.getDiscordThreadChannels(this.guildId)
        ]);
        this.featureActive = this.guild.activeFeatures.includes(this.discordService.THREAD_CHANNELS);
    }

    async updateActive(threadChannel) {
        threadChannel.active = !!threadChannel.active;
        await this.discordService.updateDiscordThreadChannel(threadChannel);
        toast(`Active status has been updated`, { severity: "success" })
    }

    goTo(threadChannel) {
        this.router.navigate(`/guild/${this.guildId}/thread-channels/${threadChannel.id}`)
    }

    async toggleFeature() {
        if (this.featureActive) {
            this.guild.activeFeatures.push(this.discordService.THREAD_CHANNELS);
            await this.discordService.setActiveFeaturesForDiscord(this.guildId, this.guild.activeFeatures);
        } else {
            this.guild.activeFeatures = this.guild.activeFeatures.filter(x => x !== this.discordService.THREAD_CHANNELS);
            await this.discordService.setActiveFeaturesForDiscord(this.guildId, this.guild.activeFeatures);
        }
        toast(this.featureActive ? "Toggled feature on" : "Toggled feature off");
    }
}
