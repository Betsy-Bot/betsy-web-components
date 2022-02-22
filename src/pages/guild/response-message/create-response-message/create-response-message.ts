import {inject, IRouteViewModel, Params, RouteNode, IEventAggregator, EventAggregator, IRouter} from "aurelia";
import {BaseDiscordCommand} from "../../../../services/models/discord";
import {DiscordService} from "../../../../services/discord-service";
import {toast} from "lets-toast";

@inject(IEventAggregator, DiscordService, IRouter)
export class CreateResponseMessage implements IRouteViewModel {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: IRouter) {
    }

    guildId: string;

    load(params: Params, next: RouteNode, current: RouteNode) {
        this.guildId = params.guildId;
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