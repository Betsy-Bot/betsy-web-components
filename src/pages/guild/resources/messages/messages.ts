import { IEventAggregator } from "aurelia";
import { DiscordService } from "../../../../services/discord-service";
import { IRouteViewModel, Router } from "@aurelia/router-lite";
import { inject } from "aurelia";

@inject(IEventAggregator, DiscordService, Router)
export class Messages implements IRouteViewModel {
    constructor(
        private eventAggregator: IEventAggregator,
        private discordService: DiscordService,
        private router: Router
    ) {}

    guildId: string;
    params;
    forms;
    messages;

    async attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
        this.messages = await this.discordService.getResourceMessagesForGuild(
            this.guildId
        );
    }

    goToEdit(message) {
        this.router.load(
            `/guild/${this.guildId}/resources/messages/edit/${message.id}`
        );
    }
}
