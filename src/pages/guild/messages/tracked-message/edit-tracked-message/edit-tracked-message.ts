import {EventAggregator} from "aurelia-event-aggregator";
import {DiscordService} from "services/discord-service";
import {Router} from "aurelia-router";
import {toast} from "lets-toast";
import {bindable, inject} from "aurelia-framework";

@inject(EventAggregator, DiscordService, Router)
export class EditTrackedMessage {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }

    activate(params) {
        this.guildId = params.guildId;
        this.messageId = params.messageId;
    }

    guildId: string;
    @bindable message;
    messageId;

    async attached() {
        this.message = await this.discordService.getTrackedMessage(this.guildId, this.messageId);
    }

    async update() {
        try {
            this.message = await this.discordService.updateTrackedMessage(this.message);
            toast("Tracked Message Updated!");
        } catch(e) {
            console.log(e);
            toast('Failed to create message', {severity: 'error'})
        }
    }
}
