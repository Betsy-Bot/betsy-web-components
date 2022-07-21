import { DiscordService } from "../../../services/discord-service";
import { Router } from "aurelia-router";
import { inject } from "aurelia-framework";
import { toast } from "lets-toast";

@inject(DiscordService, Router)
export class AutoRole {
    constructor(private discordService: DiscordService, private router: Router) {
    }

    guildId;
    containers;
    async activate(params) {
        this.guildId = params.guildId as string;
    }

    async attached() {
        [this.containers] = await Promise.all([
            await this.discordService.getAutoroleContainers(this.discordService.getLocalDiscordGuildId())
        ])
    }

    async updateActive(message) {
        let foundCommandIndex = this.containers.findIndex(x => x.name === message.name);
        if (foundCommandIndex >= 0) {
            await this.discordService.toggleAutoroleContainer(message.id);
            toast(`Active status has been updated for /${message.name}`, {severity: "success"})
        } else {
            toast("Error", {severity: "error"})
        }
    }

    goTo(message) {
        this.router.navigate(`/guild/${this.guildId}/auto-role/${message.id}`)
    }
}

