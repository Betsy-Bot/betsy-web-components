import { IEventAggregator } from "aurelia";
import { DiscordService } from "../../../../../services/discord-service";
import { IRouteViewModel, Router } from "@aurelia/router-lite";
import { inject } from "aurelia";
import { toast } from "lets-toast";

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
