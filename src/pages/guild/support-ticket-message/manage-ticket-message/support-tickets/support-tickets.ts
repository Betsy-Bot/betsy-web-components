import { IEventAggregator } from "aurelia";
import { inject } from "aurelia";
import { IRouteContext,IRouter, IRouteViewModel, Params, route } from "@aurelia/router-lite";

import { DiscordService } from "../../../../../services/discord-service";

@route({
    path: "support-tickets/:supportTicketSettingsId/submissions",
    title: "Support Tickets",
})
@inject(IEventAggregator, DiscordService, IRouter, IRouteContext)
export class SupportTickets implements IRouteViewModel {
    constructor(
        private eventAggregator: IEventAggregator,
        private discordService: DiscordService,
        private router: IRouter,
        private context: IRouteContext
    ) {}

    guildId: string;
    settingsId: string;

    featureActive;
    supportTickets;
    columns;
    linkEl: HTMLElement;

    loading(params: Params) {
        this.settingsId = params.supportTicketSettingsId;
    }

    async attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
        this.columns = [
            {
                dataField: "createdBy",
            },
            {
                dataField: "discordUserId",
            },
            {
                dataField: "closed",
            },
            {
                dataField: "closedBy",
            },
            {
                dataField: "createdDate",
                dataType: "date",
            },
            {
                caption: "",
                cellTemplate: this.linkTemplate,
                alignment: "center",
            },
        ];

        this.supportTickets =
            await this.discordService.getDiscordMessageSupportTickets(
                this.guildId,
                this.settingsId
            );
    }

    async routeToTicket(ticketId: string) {
        await this.router.load(
            `../support-tickets/${this.settingsId}/submissions/${ticketId}`,
            { context: this.context }
        );
    }

    linkTemplate = (container, options) => {
        const clone = this.linkEl.cloneNode(true) as HTMLAnchorElement;
        clone.classList.remove("d-none");
        clone.onclick = () => this.routeToTicket(options.data.id);
        container.append(clone);
    };

    async deleteAction() {
        if (window.confirm("This will force close all open tickets. Are you sure you would like to do this? This will NOT close tickets 'properly' as channels won't be deleted/moved")) {
            await this.discordService.closeAllOpenTicketsForSettings(this.settingsId);
        }
    }
}
