import { inject } from "aurelia-framework";
import { DiscordService } from "../../../services/discord-service";
import { toast } from "lets-toast";
import { EventAggregator } from "aurelia-event-aggregator";
import { Router } from "aurelia-router";
import './response-message.scss';

@inject(EventAggregator, DiscordService, Router)
export class ResponseMessage {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }

    guildId: string;
    commands;

    async activate(params) {
        this.guildId = params.guildId as string;
        this.commands = await this.discordService.getResponseMessagesForGuild(this.guildId);
    }

    async updateActive(command) {
        let foundCommandIndex = this.commands.findIndex(x => x.name === command.name);
        if (foundCommandIndex >= 0) {
            await this.discordService.toggleDiscordCommandActive(this.guildId, command.discordApplicationCommandId, this.commands[foundCommandIndex].active);
            this.commands[foundCommandIndex].active = !command.active;
            toast(`Active status has been updated for /${command.name}`, { severity: "success" })
        } else {
            toast("Error", { severity: "error" })
        }
    }

    goToCommand(command) {
        this.router.navigate(`/guild/${this.guildId}/response-message/${command.discordApplicationCommandId}`)
    }
}
