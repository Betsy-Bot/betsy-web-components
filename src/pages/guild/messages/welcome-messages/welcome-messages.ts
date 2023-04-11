import { toast } from "lets-toast";
import { IEventAggregator } from "aurelia";
import { DiscordService } from "../../../../services/discord-service";
import { inject } from "aurelia";
import { IRouteViewModel, Router } from "@aurelia/router-lite";

@inject(IEventAggregator, DiscordService, Router)
export class WelcomeMessages implements IRouteViewModel {
    constructor(
        private eventAggregator: IEventAggregator,
        private discordService: DiscordService,
        private router: Router
    ) {}

    featureActive;
    guild;
    guildId;
    messages = [];

    async attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
        [this.guild, this.messages] = await Promise.all([
            this.discordService.getDiscordServerInformation(this.guildId),
            this.discordService.getDiscordWelcomeMessages(),
        ]);
        this.featureActive = this.guild.activeFeatures.includes(
            this.discordService.WELCOME_MESSAGES
        );
    }

    async toggleFeature() {
        if (this.featureActive) {
            this.guild.activeFeatures.push(
                this.discordService.WELCOME_MESSAGES
            );
            await this.discordService.setActiveFeaturesForDiscord(
                this.guildId,
                this.guild.activeFeatures
            );
        } else {
            this.guild.activeFeatures = this.guild.activeFeatures.filter(
                (x) => x !== this.discordService.WELCOME_MESSAGES
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

    async updateActive(message) {
        const foundCommandIndex = this.messages.findIndex(
            (x) => x.name === message.name
        );
        this.messages[foundCommandIndex].active =
            !!this.messages[foundCommandIndex].active;
        if (foundCommandIndex >= 0) {
            await this.discordService.updateDiscordMessage(
                this.messages[foundCommandIndex]
            );
            toast(`Active status has been updated for ${message.name}`, {
                severity: "success",
            });
        } else {
            toast("Error", { severity: "error" });
        }
    }

    goTo(message) {
        this.router.load(
            `/guild/${this.guildId}/messages/welcome-messages/${message.id}`
        );
    }
}
