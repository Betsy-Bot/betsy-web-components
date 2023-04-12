import { inject } from "aurelia";
import {
    BaseDiscordCommand,
    DiscordCommandActionType,
    DiscordCommandType,
} from "../../../../services/models/discord";
import { DiscordService } from "../../../../services/discord-service";
import { toast } from "lets-toast";
import { IRouteViewModel, route, Router } from "@aurelia/router-lite";

@route({
    path: "response-messages/0",
    title: "Create Response Messages",
})
@inject(DiscordService, Router)
export class CreateResponseMessage implements IRouteViewModel {
    constructor(
        private discordService: DiscordService,
        private router: Router
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
            this.router.load(`/guild/${this.guildId}/response-message`);
        } catch (e) {
            console.log(e);
            toast("Failed to create command", { severity: "error" });
        }
    }
}
