import {EventAggregator} from "aurelia-event-aggregator";
import {DiscordService} from "services/discord-service";
import {Router} from "aurelia-router";
import {inject} from "aurelia-framework";
import {toast} from "lets-toast";

@inject(EventAggregator, DiscordService, Router)
export class EditTicketMessage {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }

    guildId: string;
    discordMessageId: string;

    featureActive;

    message;

    async activate(params) {
        this.guildId = params.guildId as string;
        this.discordMessageId = params.discordMessageId as string;
    }

    async attached() {
        [this.message] = await Promise.all([
            await this.discordService.getDiscordMessage(this.guildId, this.discordMessageId)
        ])
    }

    async setupSupportTicket() {
        try {
            this.message.discordGuildId = this.guildId;
            await this.discordService.updateTrackedDiscordMessage(this.message);
            toast("Updated support message!", {severity: "success"})
        } catch(e) {
            toast("Failed to setup support ticket creation message", {severity: "error"});
            throw e;
        }
    }
}
