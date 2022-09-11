import {EventAggregator} from "aurelia-event-aggregator";
import {DiscordService} from "services/discord-service";
import {Router} from "aurelia-router";
import {inject} from "aurelia-framework";
import {toast} from "lets-toast";

@inject(EventAggregator, DiscordService, Router)
export class SupportTickets {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }

    guildId: string;
    settingsId: string;

    featureActive;
    supportTickets;
    columns;

    async activate(params) {
        this.guildId = params.guildId as string;
        this.settingsId = params.settingsId as string;
    }

    async attached() {
        this.columns = [
            {
                dataField: "createdBy"
            },
            {
                dataField: "discordUserId"
            },
            {
                dataField: "closed"
            },
            {
                dataField: "closedBy"
            },
            {
                dataField: "createdDate",
                dataType: 'date',
            },
            {
                caption: '',
                cellTemplate: this.linkTemplate,
                alignment: 'center'
            },
        ]

        this.supportTickets = await this.discordService.getDiscordMessageSupportTickets(this.guildId, this.settingsId);
    }

    linkTemplate = (container, options) => {
        let el = document.createElement('span');
        el.innerHTML = `<a class="button-primary py-2 px-3" href="/guild/${this.guildId}/support-tickets/${this.settingsId}/submissions/${options.data.id}">View</a>`;
        container.append(el);
    };
}
