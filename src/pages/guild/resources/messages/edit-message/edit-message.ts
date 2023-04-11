import { IEventAggregator } from "aurelia";
import { DiscordService } from "../../../../../services/discord-service";
import { IRouteViewModel, Router } from "@aurelia/router-lite";
import { inject } from "aurelia";
import { toast } from "lets-toast";

@inject(IEventAggregator, DiscordService, Router)
export class EditMessage implements IRouteViewModel {
    constructor(
        private eventAggregator: IEventAggregator,
        private discordService: DiscordService,
        private router: Router
    ) {}

    guildId: string;
    params;
    forms;
    messages;
    messageId;
    message = {};
    guild;

    loading(params) {
        this.messageId = this.params.messageId;
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
            this.router.load("/guild/" + this.guildId + "/resources/messages");
        } else {
            toast("Failed to edit message", { severity: "error" });
        }
    }
}
