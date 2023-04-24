import { IEventAggregator, inject } from "aurelia";
import { IRouteViewModel, Params, route, IRouter } from "@aurelia/router-lite";
import { DiscordService } from "../../../../services/discord-service";
import { BaseDiscordCommand } from "../../../../services/models/discord";

import { toast } from "lets-toast";

@route({
    path: "response-messages/:messageId",
    title: "Response Message",
})
@inject(IEventAggregator, DiscordService, IRouter)
export class EditResponseMessage implements IRouteViewModel {
    constructor(
        private eventAggregator: IEventAggregator,
        private discordService: DiscordService,
        private router: IRouter
    ) {}

    id: string;
    command: BaseDiscordCommand;
    confirmDeleteDialog;

    async loading(params: Params) {
        this.id = params.messageId;
    }

    async attached() {
        this.command = await this.discordService.getDiscordCommandDetails(
            this.id
        );
    }

    deleteAction(index) {
        this.command.discordCommandActions.splice(index, 1);
    }

    createNewCommandAction() {
        this.command.discordCommandActions.push({
            type: 1,
            discordMessage: {
                message: {
                    content: null,
                    embeds: null,
                },
            },
        });
    }

    async deleteCommand(event) {
        if (event.detail.action == "ok") {
            await this.discordService.deleteDiscordCommand(this.command.id);
            toast("Response Message Deleted");
            await this.router.load('../response-messages', {context: this})
        }
    }

    async updateCommand() {
        try {
            this.command.discordGuildId =
                this.discordService.getLocalDiscordGuildId();
            await this.discordService.updateApplicationCommand(this.command);
            toast("Command Updated!");
        } catch (e) {
            toast("Failed to create command", { severity: "error" });
        }
    }
}
