import {EventAggregator} from "aurelia-event-aggregator";
import {DiscordService} from "services/discord-service";
import {Router} from "aurelia-router";
import {inject, observable} from "aurelia-framework";
import {toast} from "lets-toast";


@inject(EventAggregator, DiscordService, Router)
export class EditTicketMessage {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }

    guildId: string;
    discordMessageId: string;
    confirmDeleteDialog;

    featureActive;

    message;

    tab = 'container';

    @observable authorizedRole;

    async activate(params) {
        this.guildId = params.guildId as string;
        this.discordMessageId = params.discordMessageId as string;
    }

    async attached() {
        [this.message] = await Promise.all([
            await this.discordService.getDiscordMessage(this.guildId, this.discordMessageId)
        ])
    }

    authorizedRoleChanged(newValue, oldvalue) {
        if (!this.message.settings.assignedRoles) {
            this.message.settings.assignedRoles = [];
        }
        this.message.settings.assignedRoles.push(newValue.id);
    }

    async setupSupportTicket() {
        try {
            this.message.discordGuildId = this.guildId;
            await this.discordService.updateTrackedDiscordMessage(this.message);
            toast("Updated support message!", {severity: "success"})
        } catch(e) {
            toast("Failed to update support ticket creation message", {severity: "error"});
            throw e;
        }
    }

    async deleteSupportTicket(event) {
        if (event.detail.action == 'ok') {
            try {
                await this.discordService.deleteSupportTicketBySettingsId(this.guildId, this.message.settings.id);
                toast("Deleted support message!", {severity: "success"})
                this.router.navigateBack();
            } catch(e) {
                toast("Failed to delete support ticket creation message", {severity: "error"});
                throw e;
            }
        }
    }

    handleClone() {
        this.router.navigateToRoute(`create-ticket-message`, {data: JSON.stringify(this.message)});
    }
}
