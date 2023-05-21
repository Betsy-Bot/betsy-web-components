import { inject } from "aurelia";
import { IRouter,IRouteViewModel, route } from "@aurelia/router-lite";

import { DiscordService } from "../../../../services/discord-service";
import {
    BaseDiscordCommand,
    DiscordCommandActionType,
    DiscordCommandType,
} from "../../../../services/models/discord";

import { toast } from "lets-toast";

@route({
    path: "response-messages/0",
    title: "Create Response Messages",
})
@inject(DiscordService, IRouter)
export class CreateResponseMessage implements IRouteViewModel {
    constructor(
        private discordService: DiscordService,
        private router: IRouter
    ) {}

    attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
    }

    guildId: string;

    command: BaseDiscordCommand = {
        name: null,
        description: null,
        discordGuildId: null,
        type: DiscordCommandType.ResponseMessage,
        private: true,
        discordCommandActions: [
            {
                type: DiscordCommandActionType.MessageResponse,
                discordMessage: {
                    message: {
                        content: "Some Content",
                        embeds: null,
                    },
                },
            },
        ],
    };

    createNewCommandAction() {
        this.command.discordCommandActions.push({
            type: 2,
            discordMessage: {
                message: {
                    content: "Some Content",
                    embeds: null,
                },
            },
        });
    }

    deleteAction(index) {
        this.command.discordCommandActions.splice(index, 1);
    }

    async createCommand() {
        try {
            this.command.discordGuildId = this.guildId;
            await this.discordService.createApplicationCommand(this.command);
            toast("Command Created!");
            await this.router.load(`../response-messages`, { context: this });
        } catch (e) {
            console.log(e);
            toast("Failed to create command", { severity: "error" });
        }
    }
}
