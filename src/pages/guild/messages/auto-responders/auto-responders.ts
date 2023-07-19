import { inject } from "aurelia";
import { IRouteViewModel, route, Router } from "@aurelia/router-lite";

import { DiscordService } from "../../../../services/discord-service";
import { IDiscordGuild } from "../../../../services/models/discord";

import { toast } from "lets-toast";

@route({
    path: "auto-responders",
    title: "Auto Responders",
})
@inject(DiscordService, Router)
export class AutoResponders implements IRouteViewModel {
    constructor(
        private discordService: DiscordService,
        private router: Router
    ) {
    }

    guildId: string;
    responders;
    guild: IDiscordGuild;
    featureActive;

    async attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
        [this.responders, this.guild] = await Promise.all([
            await this.discordService.getAutoResponders(this.guildId),
            this.discordService.getDiscordServerInformation(this.guildId),
        ]);
        this.featureActive = this.guild.activeFeatures.includes(
            this.discordService.AUTO_RESPONDERS
        );
    }

    async updateActive(responder) {
        const foundCommandIndex = this.responders.findIndex(
            (x) => x.name === responder.name
        );
        this.responders[foundCommandIndex].active =
            !!this.responders[foundCommandIndex].active;
        if (foundCommandIndex >= 0) {
            await this.discordService.updateAutoResponder(
                this.responders[foundCommandIndex]
            );
            toast(`Active status has been updated for /${responder.name}`, {
                severity: "success",
            });
        } else {
            toast("Error", { severity: "error" });
        }
    }

    goTo(responder) {
        this.router.load(
            `/guild/${this.guildId}/messages/auto-responders/${responder.id}`
        );
    }

    async toggleFeature() {
        if (this.featureActive) {
            this.guild.activeFeatures.push(this.discordService.AUTO_RESPONDERS);
            await this.discordService.setActiveFeaturesForDiscord(
                this.guildId,
                this.guild.activeFeatures
            );
        } else {
            this.guild.activeFeatures = this.guild.activeFeatures.filter(
                (x) => x !== this.discordService.AUTO_RESPONDERS
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
