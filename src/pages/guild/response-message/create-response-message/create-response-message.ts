import {inject} from "aurelia-framework";
import {BaseDiscordCommand, DiscordCommandType} from "../../../../services/models/discord";
import {DiscordService} from "../../../../services/discord-service";
import {toast} from "lets-toast";
import { EventAggregator } from "aurelia-event-aggregator";
import { Router } from "aurelia-router";

@inject(EventAggregator, DiscordService, Router)
export class CreateResponseMessage {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }

    activate(params) {
        this.guildId = params.guildId;
    }

    guildId: string;

    command: BaseDiscordCommand = {
        name: null,
        description : null,
        discordGuildId: null,
        type: DiscordCommandType.ResponseMessage,
        private: true,
        discordCommandActions: [{
            type: 2,
            discordMessage: {
                message: {
                    content: 'Some Content',
                    embeds: null
                }
            }
        }]
    };

    createNewCommandAction() {
        this.command.discordCommandActions.push({
            type: 2,
            discordMessage: {
                message: {
                    content: 'Some Content',
                    embeds: null
                }
            }
        })
    }

    deleteAction(index) {
        this.command.discordCommandActions.slice(index);
    }

    async createCommand() {
        try {
            this.command.discordGuildId = this.guildId;
            const command = this.discordService.createResponseMessageCommand(this.command);
            toast("Command Created!");
            this.router.navigate(`/guild/${this.guildId}/response-message`);
        } catch(e) {
            console.log(e);
            toast('Failed to create command', {severity: 'error'})
        }
    }
}
