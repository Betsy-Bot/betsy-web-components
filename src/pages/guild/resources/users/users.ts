import { EventAggregator } from "aurelia-event-aggregator";
import { DiscordService } from "services/discord-service";
import { Router } from "aurelia-router";
import { inject } from "aurelia-framework";
import DataGrid from 'devextreme/ui/data_grid';

@inject(EventAggregator, DiscordService, Router)
export class Users {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }

    users;
    columns: object[];
    detailTemplate;
    rowDetail;
    rowCaption;

    async attached() {
        this.users = await this.discordService.getUsersForGuild(this.discordService.getLocalDiscordGuildId());
        this.columns = [
            {
                dataField: "discordUserId"
            },
            {
                dataField: "lastKnownName"
            },
            {
                dataField: "createdDate",
                dataType: 'date',
            },
            {
                caption: 'Email Fraud Score',
                dataField: "emailInformation.fraudScore"
            },
            {
                caption: "Number of IPs",
                dataField: "ips.length"
            }
        ]
        console.log(this.users);

        this.detailTemplate = (container, options) => {
            const data = options.data;
            this.rowCaption.innerText = 'Found Ips for ' + data.discordUserId;
            container.appendChild(this.rowCaption);
            new DataGrid(this.rowDetail, {
                columnAutoWidth: true,
                showBorders: true,
                columns: [
                    {
                        dataField: 'ip',
                    },
                    {
                        dataField: 'fraudScore',
                    },
                    {
                        dataField: 'isp',
                    },
                    {
                        dataField: 'countryCode',
                    },
                    {
                        dataField: 'recentAbuse',
                    },
                    {
                        dataField: 'botStatus',
                    },
                    {
                        dataField: 'proxy',
                    },
                    {
                        dataField: 'vpn',
                    },
                    {
                        dataField: 'tor',
                    },
                    {
                        dataField: 'mobile',
                    }
                ],
                dataSource: data.ips
            });

            container.appendChild(this.rowDetail);
        };
    }
}
