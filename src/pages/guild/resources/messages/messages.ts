import { EventAggregator } from "aurelia-event-aggregator";
import { DiscordService } from "../../../../services/discord-service";
import { Router } from "aurelia-router";
import { inject } from "aurelia-framework";

@inject(EventAggregator, DiscordService, Router)
export class Messages {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }

    guildId: string;
    params;
    forms;
    messages;

    activate(params) {
        this.params = params;
        this.guildId = this.params.guildId;
    }

    async attached() {
        this.messages = await this.discordService.getResourceMessagesForGuild(this.guildId);
    }

    goToEdit(message) {
        this.router.navigate(`/guild/${this.guildId}/resources/messages/edit/${message.id}`)
    }
}
