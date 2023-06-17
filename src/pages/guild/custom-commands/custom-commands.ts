import { inject } from "aurelia";
import { IRouteViewModel, route, Router } from "@aurelia/router-lite";

import { DiscordService } from "../../../services/discord-service";

import { toast } from "lets-toast";

@route({
    path: "custom-commands",
    title: "Custom Commands",
})
@inject(DiscordService, Router)
export class CustomCommands implements IRouteViewModel {
    constructor(
        private discordService: DiscordService,
        private router: Router
    ) {}

    guildId: string;
    commands;
    guild;
    featureActive;

    async attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
        [this.commands, this.guild] = await Promise.all([
            await this.discordService.getCustomCommands(),
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
}
