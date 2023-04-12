import { IEventAggregator } from "aurelia";
import { inject } from "aurelia";
import { IRouteViewModel, Params, route, Router } from "@aurelia/router-lite";

import { DiscordService } from "../../../../../services/discord-service";

@route({
    path: "support-tickets/:supportTicketSettingsId/submissions",
    title: "Support Tickets",
})
@inject(IEventAggregator, DiscordService, Router)
export class SupportTickets implements IRouteViewModel {
    constructor(
        private eventAggregator: IEventAggregator,
        private discordService: DiscordService,
        private router: Router
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
            `/guild/${this.guildId}/support-tickets/${this.settingsId}/submissions/${ticketId}`
        );
    }

    linkTemplate = (container, options) => {
        const clone = this.linkEl.cloneNode(true) as HTMLAnchorElement;
        clone.classList.remove("d-none");
        clone.onclick = () => this.routeToTicket(options.data.id);
        container.append(clone);
    };
}
