import {inject, IRouteViewModel, Params, RouteNode, IEventAggregator} from "aurelia";
import {DiscordService} from "../../../services/discord-service";
import {toast} from "lets-toast";

@inject(IEventAggregator, DiscordService)
export class ResponseMessage implements IRouteViewModel {
    constructor(private eventAggregator: IEventAggregator, private discordService: DiscordService) {
    }

    guildId: string;
    commands;

    async load(params: Params, next: RouteNode, current: RouteNode) {
        this.guildId = params.guildId;
        this.commands = await this.discordService.getResponseMessagesForGuild(this.guildId);
    }

    async updateActive(command) {
        let foundCommandIndex = this.commands.findIndex(x => x.name === command.name);
        if (foundCommandIndex >= 0) {
            await this.discordService.toggleDiscordCommandActive(this.guildId, command.discordApplicationCommandId, this.commands[foundCommandIndex].active);
            this.commands[foundCommandIndex].active = !command.active;
            toast(`Active status has been updated for /${command.name}`, {severity: "success"})
        } else {
            toast("Error", {severity: "error"})
        }
    }
}