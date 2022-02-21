import {inject, IRouteViewModel, Params, RouteNode, IEventAggregator, EventAggregator} from "aurelia";
import {BaseDiscordCommand, DiscordCommandAction} from "../../../../services/models/discord";
import {DiscordService} from "../../../../services/discord-service";
import {create} from "domain";

@inject(IEventAggregator, DiscordService)
export class CreateResponseMessage implements IRouteViewModel {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService) {
    }

    guildId: string;

    load(params: Params, next: RouteNode, current: RouteNode) {
        this.guildId = params.guildId;
    }

    binding() {
        this.eventAggregator.publish('guild-updated', this.guildId)
    }

    bound() {
        this.createNewCommandAction();
    }

    command: BaseDiscordCommand = {
        name: null,
        description : null,
        discordGuildId: null,
        discordCommandActions: []
    };

    createNewCommandAction() {
        this.command.discordCommandActions.push({
            type: 1,
            discordMessage: {
                content: 'Some Content',
                embeds: null
            }
        })
    }

    deleteAction(index) {
        this.command.discordCommandActions.slice(index);
    }

    async createCommand() {
        console.log('this.command', this.command);
        this.command.discordGuildId = this.guildId;
        const command = this.discordService.createResponseMessageCommand(this.command);
        console.log('command', command)
    }
}