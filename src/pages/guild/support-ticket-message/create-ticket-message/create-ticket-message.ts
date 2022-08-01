import {EventAggregator} from "aurelia-event-aggregator";
import {DiscordService} from "services/discord-service";
import {Router} from "aurelia-router";
import {inject, observable} from "aurelia-framework";
import {toast} from "lets-toast";
import {DiscordButtonStyle, DiscordComponentType} from "services/models/discord";
import { ValidationControllerFactory, ValidationRules, ValidationController, Rule } from 'aurelia-validation';

@inject(EventAggregator, DiscordService, Router, ValidationControllerFactory)
export class CreateTicketMessage {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router, private validationControllerFactory: ValidationControllerFactory) {
        this.validationController = this.validationControllerFactory.createForCurrentScope();
        this.rules = ValidationRules
            .ensure('channelId').required().withMessage('Required').then()
            .rules;
    }

    guildId: string;
    guild;

    featureActive;

    tab = 'settings';
    @observable authorizedRole;

    request = {
        identifier: '',
        id: undefined,
        logChannelId: '',
        assignedRoles: [],
        initialMessage: {},
        closeButtonText: 'Close',
        discordMessage: {
            discordChannelId: '',
            discordCategoryId: '',
            type: 1,
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
        }
    };

    validationController: ValidationController;
    rules: Rule<CreateTicketMessage, unknown>[][];

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
        }
        this.bound = true;
    }

    authorizedRoleChanged(newValue, oldvalue) {
        if (!this.request.assignedRoles) {
            this.request.assignedRoles = [];
        }
        this.request.assignedRoles.push(newValue.id);
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
