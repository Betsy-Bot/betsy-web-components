import { IEventAggregator } from "aurelia";
import { inject } from "aurelia";
import { IRouteViewModel, route, Router } from "@aurelia/router-lite";

import { DiscordService } from "../../../../services/discord-service";

import DataGrid from "devextreme/ui/data_grid";

@route({
    path: "users",
    title: "Users",
})
@inject(IEventAggregator, DiscordService, Router)
export class Users implements IRouteViewModel {
    constructor(
        private eventAggregator: IEventAggregator,
        private discordService: DiscordService,
        private router: Router
    ) {}

    users;
    detailTemplate;
    rowDetail;
    rowCaption;
    columns = [
        {
            dataField: "discordUserId",
        },
        {
            dataField: "lastKnownName",
        },
        {
            dataField: "createdDate",
            dataType: "date",
        },
        {
            caption: "Email Fraud Score",
            dataField: "emailInformation.fraudScore",
        },
        {
            caption: "Number of IPs",
            dataField: "ips.length",
        },
    ];

    async attached() {
        this.users = await this.discordService.getUsersForGuild(this.discordService.getLocalDiscordGuildId());

        this.detailTemplate = (container, options) => {
            const data = options.data;
            this.rowCaption.innerText = "Found Ips for " + data.discordUserId;
            container.appendChild(this.rowCaption);
            new DataGrid(this.rowDetail, {
                columnAutoWidth: true,
                showBorders: true,
                columns: [
                    {
                        dataField: "ip",
                    },
                    {
                        dataField: "fraudScore",
                    },
                    {
                        dataField: "isp",
                    },
                    {
                        dataField: "countryCode",
                    },
                    {
                        dataField: "recentAbuse",
                    },
                    {
                        dataField: "botStatus",
                    },
                    {
                        dataField: "proxy",
                    },
                    {
                        dataField: "vpn",
                    },
                    {
                        dataField: "tor",
                    },
                    {
                        dataField: "mobile",
                    },
                ],
                dataSource: data.ips,
            });

            container.appendChild(this.rowDetail);
        };
    }
}
