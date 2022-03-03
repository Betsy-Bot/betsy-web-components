import { inject, Params, RouteNode, IEventAggregator } from "aurelia";
import { DiscordService } from "../../../services/discord-service";
import { toast } from "lets-toast";
import { IRouter, IRouteableComponent, Parameters, RoutingInstruction, Navigation } from 'aurelia-direct-router';

@inject(IEventAggregator, DiscordService, IRouter)
export class ResponseMessage implements IRouteableComponent {
    constructor(private eventAggregator: IEventAggregator, private discordService: DiscordService, private router: IRouter) {
    }

    guildId: string;
    commands;

    async load?(parameters: Parameters, instruction: RoutingInstruction, navigation: Navigation) {
        this.guildId = parameters.guildId as string;
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

    async goToCommand(command) {
        await this.router.load(`/guild/${this.guildId}/response-message/${command.discordApplicationCommandId}`)
    }
}
