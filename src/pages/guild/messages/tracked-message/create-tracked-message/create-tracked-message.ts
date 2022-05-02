import {EventAggregator} from "aurelia-event-aggregator";
import {DiscordService} from "services/discord-service";
import {Router} from "aurelia-router";
import {toast} from "lets-toast";
import {inject} from "aurelia-framework";

@inject(EventAggregator, DiscordService, Router)
export class CreateTrackedMessage {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }

    activate(params) {
        this.guildId = params.guildId;
    }

    guildId: string;
    request = {
        name: null,
        discordMessage: {
            message: {
                content: '',
                embeds: null
            }
        }
    };

    async create() {
        try {
            await this.discordService.createTrackedMessage(this.guildId, this.request);
            toast("Tracked Message Created!");
            this.router.navigate(`/guild/${this.guildId}/messages/tracked-messages`);
        } catch(e) {
            console.log(e);
            toast('Failed to create message', {severity: 'error'})
        }
    }
}
