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
    supportTicketSettingsId: string;
    confirmDeleteDialog;

    featureActive;

    ticket;

    tab = 'container';

    @observable authorizedRole;

    async activate(params) {
        this.guildId = params.guildId as string;
        this.supportTicketSettingsId = params.supportTicketSettingsId as string;
    }

    async attached() {
        [this.ticket] = await Promise.all([
            await this.discordService.getSupportTicketSettingsById(this.supportTicketSettingsId)
        ])

        //Temp solution because it wasn't clearing it for some reason
        this.eventAggregator.subscribe('form-cleared', payload => {
            this.ticket.discordFormId = null;
            this.ticket.discordForm = null;
        });
    }

    authorizedRoleChanged(newValue, oldvalue) {
        if (!this.ticket.assignedRoles) {
            this.ticket.assignedRoles = [];
        }
        this.ticket.assignedRoles.push(newValue.id);
    }

    async editSupportTicketSettings() {
        try {
            this.ticket.discordGuildId = this.guildId;
            await this.discordService.updateSupportTicketSettings(this.guildId, this.ticket);
            toast("Updated support message!", {severity: "success"})
        } catch(e) {
            toast("Failed to update support ticket creation message", {severity: "error"});
            throw e;
        }
    }

    async deleteSupportTicket(event) {
        if (event.detail.action == 'ok') {
            try {
                await this.discordService.deleteSupportTicketBySettingsId(this.ticket.id);
                toast("Deleted support message!", {severity: "success"})
                this.router.navigateBack();
            } catch(e) {
                toast("Failed to delete support ticket creation message", {severity: "error"});
                throw e;
            }
        }
    }

    handleClone() {
        this.router.navigateToRoute(`create-ticket-message`, {data: JSON.stringify(this.ticket)});
    }
}
