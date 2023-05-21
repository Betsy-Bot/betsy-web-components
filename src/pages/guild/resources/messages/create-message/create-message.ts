import { IEventAggregator } from "aurelia";
import { inject } from "aurelia";
import { IRouteViewModel, route, Router } from "@aurelia/router-lite";

import { DiscordService } from "../../../../../services/discord-service";

import { toast } from "lets-toast";

@route({
    path: "messages/create",
    title: "Create Message",
})
@inject(IEventAggregator, DiscordService, Router)
export class CreateMessage implements IRouteViewModel {
    constructor(
        private eventAggregator: IEventAggregator,
        private discordService: DiscordService,
        private router: Router
    ) {}

    guildId: string;
    params;
    forms;
    messages;
    request = {
        type: 2,
        active: true,
        discordServerId: "",
        message: {},
    };
    guild;

    async attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
        this.guild = await this.discordService.getDiscordServerInformation(
            this.guildId
        );
        this.request.discordServerId = this.guild.id;
    }

    async saveMessage() {
        const response = await this.discordService.createDiscordMessage(
            this.request
        );
        if (response) {
            toast("Created Message", { severity: "success" });
            this.router.load("/guild/" + this.guildId + "/resources/messages");
        } else {
            toast("Failed to create message", { severity: "error" });
        }
    }
}
