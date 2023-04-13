import { IEventAggregator, inject, observable } from "aurelia";
import { IRouteViewModel, Params, route, IRouter, IRouteContext } from "@aurelia/router-lite";

import { DiscordService } from "../../../../services/discord-service";

import { toast } from "lets-toast";

@route({
    path: "support-tickets/:supportTicketSettingsId",
    title: "Edit Ticket",
})
@inject(IEventAggregator, DiscordService, IRouter, IRouteContext)
export class EditTicketMessage implements IRouteViewModel {
    constructor(
        private eventAggregator: IEventAggregator,
        private discordService: DiscordService,
        private router: IRouter,
        private context: IRouteContext
    ) {}

    guildId: string;
    supportTicketSettingsId: string;
    confirmDeleteDialog;
    featureActive;

    ticket;

    tab = "settings";

    @observable authorizedRole;

    loading(params: Params) {
        this.supportTicketSettingsId = params.supportTicketSettingsId;
    }

    async attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
        [this.ticket] = await Promise.all([
            await this.discordService.getSupportTicketSettingsById(
                this.supportTicketSettingsId
            ),
        ]);

        //Temp solution because it wasn't clearing it for some reason
        this.eventAggregator.subscribe("form-cleared", (payload) => {
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
            await this.discordService.updateSupportTicketSettings(this.ticket);
            toast("Updated support message!", { severity: "success" });
        } catch (e) {
            toast("Failed to update support ticket creation message", {
                severity: "error",
            });
            throw e;
        }
    }

    async deleteSupportTicket(event) {
        if (event.detail.action == "ok") {
            try {
                await this.discordService.deleteSupportTicketBySettingsId(
                    this.ticket.id
                );
                toast("Deleted support message!", { severity: "success" });
            } catch (e) {
                toast("Failed to delete support ticket creation message", {
                    severity: "error",
                });
                throw e;
            }
        }
    }

    handleClone() {
        this.router.load(`../support-tickets/0`, {context: this.context, queryParams: this.ticket});
    }
}
