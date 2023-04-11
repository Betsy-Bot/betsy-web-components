import {DiscordService} from "../../../services/discord-service";
import {IRouteViewModel, route, Router} from "@aurelia/router-lite";
import {SessionService} from "../../../services/session-service";
import {inject} from "aurelia";
import {toast} from "lets-toast";

@route({
    path: "payments",
    title: "Payments",
},)
@inject(DiscordService, Router, SessionService)
export class Payments implements IRouteViewModel {
    constructor(
        private discordService: DiscordService,
        private router: Router,
        private sessionService: SessionService
    ) {
    }

    guild;
    featureActive;
    guildId: string;

    async attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
        [this.guild] = await Promise.all([
            await this.discordService.getDiscordServerInformation(this.guildId),
        ]);
        this.featureActive = this.guild.activeFeatures.includes(
            this.discordService.PAYMENTS
        );
    }

    async updateKeys() {
        await this.discordService.updateApiKyesForGuild(
            this.guild,
            this.guildId
        );
    }

    async toggleFeature() {
        if (this.featureActive) {
            this.guild.activeFeatures.push(this.discordService.PAYMENTS);
            await this.discordService.setActiveFeaturesForDiscord(
                this.guildId,
                this.guild.activeFeatures
            );
        } else {
            this.guild.activeFeatures = this.guild.activeFeatures.filter(
                (x) => x !== this.discordService.PAYMENTS
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
}
