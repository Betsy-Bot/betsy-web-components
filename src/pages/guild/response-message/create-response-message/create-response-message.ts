import {EventAggregator, IEventAggregator, inject, IRouter, IRouteViewModel, Params, RouteNode} from "aurelia";
import {BaseDiscordCommand, DiscordCommandType} from "../../../../services/models/discord";
import {DiscordService} from "../../../../services/discord-service";
import {toast} from "lets-toast";

@inject(IEventAggregator, DiscordService, IRouter)
export class CreateResponseMessage implements IRouteViewModel {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: IRouter) {
    }

    load(params: Params, next: RouteNode, current: RouteNode) {
        this.guildId = params.guildId;
    }

    guildId: string;

    command: BaseDiscordCommand = {
        name: null,
        description : null,
        discordGuildId: null,
        type: DiscordCommandType.ResponseMessage,
        discordCommandActions: [{
            type: 1,
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
            type: 1,
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
            this.router.load(`/guild/${this.guildId}/response-message`);
        } catch(e) {
            toast('Failed to create command', {severity: 'error'})
        }
    }
}