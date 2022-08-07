import {EventAggregator} from "aurelia-event-aggregator";
import {DiscordService} from "services/discord-service";
import {Router} from "aurelia-router";
import {toast} from "lets-toast";
import {bindable, inject} from "aurelia-framework";

@inject(EventAggregator, DiscordService, Router)
export class ManageWelcomeMessage {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }

    activate(params) {
        this.guildId = params.guildId;
        this.messageId = params.messageId;
    }

    guildId: string;
    @bindable message;
    messageId;
    isNew: boolean;
    messageTemplate = {
        name: '',
        discordChannelId: '',
        discordServerId: '',
        type: 3,
    }

    async attached() {
        if (!this.messageId || this.messageId == 0) {
            this.isNew = true;
            this.message = this.messageTemplate;
        } else {
            this.message = await this.discordService.getDiscordMessageById(this.messageId);
        }
        this.messageTemplate.discordServerId = this.discordService.getLocalGuild().id;
    }

    async save() {
        if (!this.message.discordChannelId && this.message.type == 3) return;
        try {
            if (this.isNew) {
                this.message = await this.discordService.createDiscordMessage(this.message);
            } else {
                this.message = await this.discordService.updateDiscordMessage(this.message);
            }
            toast(`Welcome Message ${this.isNew ? 'Created' : 'Updated'}!`);
            this.router.navigateBack();
        } catch(e) {
            console.log(e);
            toast('Failed to create message', {severity: 'error'})
        }
    }
}
