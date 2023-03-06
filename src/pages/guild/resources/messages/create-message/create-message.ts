import { EventAggregator } from "aurelia-event-aggregator";
import { DiscordService } from "../../../../../services/discord-service";
import { Router } from "aurelia-router";
import { inject } from "aurelia-framework";
import { toast } from "lets-toast";

@inject(EventAggregator, DiscordService, Router)
export class CreateMessage {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }

    guildId: string;
    params;
    forms;
    messages;
    request = {
        type: 2,
        active: true,
        discordServerId: '',
        message: {}
    }
    guild;

    activate(params) {
        this.params = params;
        this.guildId = this.params.guildId;
    }

    async attached() {
        this.guild = await this.discordService.getDiscordServerInformation(this.guildId);
        this.request.discordServerId = this.guild.id;
        console.log(this.guild);
    }

    async saveMessage() {
        const response = await this.discordService.createDiscordMessage(this.request);
        if (response) {
            toast('Created Message', { severity: 'success' });
            this.router.navigate('/guild/' + this.guildId + '/resources/messages');
        } else {
            toast('Failed to create message', { severity: 'error' });
        }
    }
}
