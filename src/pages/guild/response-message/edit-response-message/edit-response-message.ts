import {inject} from "aurelia-framework";
import {BaseDiscordCommand, DiscordCommandType} from "../../../../services/models/discord";
import {DiscordService} from "../../../../services/discord-service";
import {toast} from "lets-toast";
import { EventAggregator } from "aurelia-event-aggregator";
import { Router } from "aurelia-router";

@inject(EventAggregator, DiscordService, Router)
export class EditResponseMessage {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }

    guildId: string;
    discordApplicationCommandId: string;

    command: BaseDiscordCommand;

    async activate(params) {
        this.guildId = params.guildId;
        this.discordApplicationCommandId = params.discordApplicationCommandId;
        this.command = await this.discordService.getDiscordCommandDetails(this.discordApplicationCommandId)
    }

    deleteAction(action) {
        const index = this.command?.discordCommandActions?.findIndex(action);
        if (index >= 0) {
            this.command.discordCommandActions.slice(index);
        }
    }

    createNewCommandAction() {
        this.command.discordCommandActions.push({
            type: 1,
            discordMessage: {
                message: {
                    content: null,
                    embeds: null
                }
            }
        })
    }

    async updateCommand() {
        try {
            this.command.discordGuildId = this.guildId;
            await this.discordService.updateApplicationCommand(this.command);
            toast("Command Updated!");
        } catch(e) {
            toast('Failed to create command', {severity: 'error'})
        }
    }
}
