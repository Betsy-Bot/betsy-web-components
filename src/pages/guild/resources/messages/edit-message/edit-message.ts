import { IEventAggregator } from "aurelia";
import { inject } from "aurelia";
import { IRouter, IRouteViewModel, Params, route } from "@aurelia/router-lite";

import { DiscordService } from "../../../../../services/discord-service";

import { toast } from "lets-toast";

@route({
    path: "messages/:messageId",
    title: "Manage Message",
})
@inject(IEventAggregator, DiscordService, IRouter)
export class EditMessage implements IRouteViewModel {
    constructor(
        private eventAggregator: IEventAggregator,
        private discordService: DiscordService,
        private router: IRouter
    ) {}

    guildId: string;
    params;
    forms;
    messages;
    messageId;
    message = {};
    guild;

    loading(params: Params) {
        this.messageId = params.messageId;
    }

    async attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
        this.message = await this.discordService.getDiscordMessageById(
            this.messageId
        );
    }

    async saveMessage() {
        const response = await this.discordService.updateDiscordMessage(
            this.message
        );
        if (response) {
            toast("Edited Message", { severity: "success" });
            this.router.load("../messages", { context: this });
        } else {
            toast("Failed to edit message", { severity: "error" });
        }
    }
}
