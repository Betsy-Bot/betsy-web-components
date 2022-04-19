import {EventAggregator} from "aurelia-event-aggregator";
import {DiscordService} from "services/discord-service";
import {Router} from "aurelia-router";
import {inject} from "aurelia-framework";
import {toast} from "lets-toast";
import {
    DiscordButtonStyle,
    DiscordComponentType,
    DiscordSupportTicketSettings
} from "../../../../services/models/discord";

@inject(EventAggregator, DiscordService, Router)
export class CreateTicketMessage {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }

    guildId: string;
    guild;

    featureActive;

    request = {
        discordChannelId: '',
        discordCategoryId: '',
        message: {
            components: [ {
                type: DiscordComponentType.ActionRow,
                components: [{
                    type: DiscordComponentType.Button,
                    label: "Create Ticket",
                    style: DiscordButtonStyle.Primary
                }]
            }]
        },
        settings: {
            logChannelId: '',
            assignedRoles: []
        }
    };

    async activate(params) {
        this.guildId = params.guildId as string;
    }

    async attached() {
        [this.guild] = await Promise.all([
            await this.discordService.getDiscordServerInformation(this.guildId)
        ])
        this.featureActive = this.guild.activeFeatures.includes(this.discordService.SUPPORT_TICKETS);
    }

    async setupSupportTicket() {
        try {
            await this.discordService.setupSupportTicketMessage(this.guildId, this.request);
            toast("Created support message!", {severity: "success"})
            this.router.navigate(`support-tickets`)
        } catch(e) {
            toast("Failed to setup support ticket creation message", {severity: "error"});
            throw e;
        }
    }
}
