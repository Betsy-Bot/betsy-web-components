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
    id: string;

    command: BaseDiscordCommand;

    async activate(params) {
        this.guildId = params.guildId;
        this.id = params.id;
        this.command = await this.discordService.getDiscordCommandDetails(this.id)
    }

    deleteAction(index) {
        this.command.discordCommandActions.splice(index, 1);
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
