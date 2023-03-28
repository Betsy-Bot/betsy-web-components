import { EventAggregator } from "aurelia-event-aggregator";
import { DiscordService } from "services/discord-service";
import { Router } from "aurelia-router";
import { toast } from "lets-toast";
import { bindable, inject } from "aurelia-framework";

@inject(EventAggregator, DiscordService, Router)
export class ManageTrackedMessage {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }

    activate(params) {
        this.guildId = params.guildId;
        this.messageId = params.messageId;
    }

    guildId: string;
    @bindable message;
    messageId;
    isNew;
    messageTemplate = {
        name: null,
        discordMessage: {
            message: {
                content: '',
                embeds: []
            }
        }
    };
    confirmDeleteDialog: HTMLElement;

    async attached() {
        if (!this.messageId || this.messageId == 0) {
            this.isNew = true;
            this.message = this.messageTemplate;
        } else {
            this.message = await this.discordService.getTrackedMessage(this.guildId, this.messageId);
        }
    }

    copy() {
        this.isNew = true;
        this.message.id = undefined;
        this.message.name = undefined;
        this.message.discordMessage.id = undefined;
    }

    async save() {
        try {
            if (this.isNew) {
                await this.discordService.createTrackedMessage(this.guildId, this.message);
                toast("Tracked Message Created!");
                this.router.navigate(`/guild/${this.guildId}/messages/tracked-messages`);
            } else {
                this.message = await this.discordService.updateTrackedMessage(this.message);
                toast("Tracked Message Updated!");
            }
        } catch(e) {
            console.log(e);
            toast('Failed to create message', { severity: 'error' })
        }
    }

    async deleteItem(event) {
        if (event.detail.action == 'ok') {
            try {
                await this.discordService.deleteDiscordTrackedMessageById(this.message.id);
                toast("Deleted thread channel!", { severity: "success" })
                this.router.navigateBack();
            } catch(e) {
                toast("Failed to delete thread channel", { severity: "error" });
                throw e;
            }
        }
    }
}
