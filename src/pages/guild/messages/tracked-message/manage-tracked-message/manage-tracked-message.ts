import {EventAggregator} from "aurelia-event-aggregator";
import {DiscordService} from "services/discord-service";
import {Router} from "aurelia-router";
import {toast} from "lets-toast";
import {bindable, inject} from "aurelia-framework";

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
                embeds: null
            }
        }
    };

    async attached() {
        if (!this.messageId || this.messageId == 0) {
            this.isNew = true;
            this.message = this.messageTemplate;
        } else {
            this.message = await this.discordService.getTrackedMessage(this.guildId, this.messageId);
        }
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
            toast('Failed to create message', {severity: 'error'})
        }
    }
}
