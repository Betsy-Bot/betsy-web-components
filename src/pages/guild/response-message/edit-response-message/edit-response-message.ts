import {EventAggregator, IEventAggregator, inject, IRouter, IRouteViewModel, Params, RouteNode} from "aurelia";
import {BaseDiscordCommand, DiscordCommandType} from "../../../../services/models/discord";
import {DiscordService} from "../../../../services/discord-service";
import {toast} from "lets-toast";

@inject(IEventAggregator, DiscordService, IRouter)
export class EditResponseMessage implements IRouteViewModel {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: IRouter) {
    }

    guildId: string;
    discordApplicationCommandId: string;

    command: BaseDiscordCommand;

    async load(params: Params, next: RouteNode, current: RouteNode) {
        this.guildId = params.guildId;
        this.discordApplicationCommandId = params.discordApplicationCommandId;
        this.command = await this.discordService.getDiscordCommandDetails(this.discordApplicationCommandId)
    }

    deleteAction(index) {
        this.command.discordCommandActions.slice(index);
    }

    async updateCommand() {
        try {
            // this.command.discordGuildId = this.guildId;
            // const command = this.discordService.createResponseMessageCommand(this.command);
            // toast("Command Created!");
            // this.router.load(`/guild/${this.guildId}/response-message`);
        } catch(e) {
            toast('Failed to create command', {severity: 'error'})
        }
    }
}