import { inject } from "aurelia";
import { route, Router } from "@aurelia/router-lite";
import { IRouteViewModel } from "@aurelia/router-lite";

import { DiscordService } from "../../../services/discord-service";

import { toast } from "lets-toast";

@route({
    path: "data-commands",
    title: "Data Commands",
})
@inject(DiscordService, Router)
export class DataCommands implements IRouteViewModel {
    constructor(
        private discordService: DiscordService,
        private router: Router
    ) {
    }

    guildId: string;
    commands;
    guild;
    featureActive;

    async attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
        [this.commands, this.guild] = await Promise.all([
            await this.discordService.getDataCommandsForGuild(this.guildId),
            await this.discordService.getDiscordServerInformation(this.guildId),
        ]);
        this.featureActive = this.guild.activeFeatures.includes(
            this.discordService.DATA_COMMANDS
        );
    }

    async updateActive(command) {
        const foundCommandIndex = this.commands.findIndex(
            (x) => x.name === command.name
        );
        if (foundCommandIndex >= 0) {
            await this.discordService.toggleDiscordCommandActive(
                this.guildId,
                command.id,
                this.commands[foundCommandIndex].active
            );
            toast(`Active status has been updated for /${command.name}`, {
                severity: "success",
            });
        } else {
            toast("Error", { severity: "error" });
        }
    }

    goToCommand(command) {
        this.router.load(`/guild/${this.guildId}/data-commands/${command.id}`);
    }

    async toggleFeature() {
        if (this.featureActive) {
            this.guild.activeFeatures.push(this.discordService.DATA_COMMANDS);
            await this.discordService.setActiveFeaturesForDiscord(
                this.guildId,
                this.guild.activeFeatures
            );
        } else {
            this.guild.activeFeatures = this.guild.activeFeatures.filter(
                (x) => x !== this.discordService.DATA_COMMANDS
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
