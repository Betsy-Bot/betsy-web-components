import { EventAggregator } from "aurelia-event-aggregator";
import { DiscordService } from "../../../../../services/discord-service";
import { Router } from "aurelia-router";
import { inject } from "aurelia-framework";
import { toast } from "lets-toast";

@inject(EventAggregator, DiscordService, Router)
export class EditMessage {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }

    guildId: string;
    params;
    forms;
    messages;
    messageId;
    message = {}
    guild;

    activate(params) {
        this.params = params;
        this.guildId = this.params.guildId;
        this.messageId = this.params.messageId;
    }

    async attached() {
        this.message = await this.discordService.getDiscordMessageById(this.messageId);
    }

    async saveMessage() {
        const response = await this.discordService.updateDiscordMessage(this.message);
        if (response) {
            toast('Edited Message', { severity: 'success' });
            this.router.navigate('/guild/' + this.guildId + '/resources/messages');
        } else {
            toast('Failed to edit message', { severity: 'error' });
        }
    }
}
