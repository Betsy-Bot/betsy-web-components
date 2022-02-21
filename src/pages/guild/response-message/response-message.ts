import {inject, IRouteViewModel, Params, RouteNode, IEventAggregator} from "aurelia";
import {DiscordService} from "../../../services/discord-service";

@inject(IEventAggregator, DiscordService)
export class ResponseMessage implements IRouteViewModel {
    constructor(private eventAggregator: IEventAggregator, private discordService: DiscordService) {
    }

    guildId: string;
    commands;

    load(params: Params, next: RouteNode, current: RouteNode) {
        this.guildId = params.guildId;
    }

    async binding() {
        this.eventAggregator.publish('guild-updated', this.guildId)

        this.commands = await this.discordService.getResponseMessagesForGuild(this.guildId);
        console.log('commands', this.commands);
    }
}