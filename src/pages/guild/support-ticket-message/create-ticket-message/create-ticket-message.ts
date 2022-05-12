import {EventAggregator} from "aurelia-event-aggregator";
import {DiscordService} from "services/discord-service";
import {Router} from "aurelia-router";
import {inject, observable} from "aurelia-framework";
import {toast} from "lets-toast";
import {DiscordButtonStyle, DiscordComponentType} from "services/models/discord";

@inject(EventAggregator, DiscordService, Router)
export class CreateTicketMessage {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }

    guildId: string;
    guild;

    featureActive;

    tab = 'container';
    @observable authorizedRole;

    request = {
        discordChannelId: '',
        discordCategoryId: '',
        name: '',
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
            id: undefined,
            logChannelId: '',
            assignedRoles: [],
            initialMessage: {}
        }
    };

    loading = false;
    params;
    bound = false;

    async activate(params) {
        this.guildId = params.guildId as string;
        this.params = params;
    }

    async attached() {
        [this.guild] = await Promise.all([
            await this.discordService.getDiscordServerInformation(this.guildId)
        ])
        this.featureActive = this.guild.activeFeatures.includes(this.discordService.SUPPORT_TICKETS);
        if (this.params.data) {
            this.request = JSON.parse(this.params.data);
            this.request.settings.id = undefined;
        }
        this.bound = true;
        console.log(this.request);
    }

    authorizedRoleChanged(newValue, oldvalue) {
        if (!this.request.settings.assignedRoles) {
            this.request.settings.assignedRoles = [];
        }
        this.request.settings.assignedRoles.push(newValue.id);
    }

    async setupSupportTicket() {
        if (this.loading) {
            return;
        }
        try {
            this.loading = true;
            await this.discordService.setupSupportTicketMessage(this.guildId, this.request);
            toast("Created support message!", {severity: "success"})
            this.router.navigate(`support-tickets`)
        } catch(e) {
            toast("Failed to setup support ticket creation message", {severity: "error"});
            throw e;
        } finally {
            this.loading = false;
        }
    }
}
