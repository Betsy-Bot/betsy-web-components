import { Router } from 'aurelia-router';
import { inject } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";
import { DiscordService } from 'services/discord-service';
import DataGrid from 'devextreme/ui/data_grid';

@inject(EventAggregator, DiscordService, Router)
export class AuditLogs {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }
    guildId: string;
    params;
    auditLogs;
    table;
    dataGrid;

    actionTypes = [
        {
            value: 0,
            text: "Create"
        },
        {
            value: 1,
            text: "Update"
        },
        {
            value: 2,
            text: "Delete"
        }
    ]

    activate(params) {
        this.params = params;
        this.guildId = this.params.guildId;
    }

    async attached() {
        this.auditLogs = await this.discordService.getAuditLogs();
        this.dataGrid = new DataGrid(this.table, {
            dataSource: this.auditLogs,
            showBorders: true,
            filterRow: {
                visible: true,
                applyFilter: 'auto'
            },
            paging: {
                enabled: true,
                pageSize: 25
            },
            pager: {
                showPageSizeSelector: true,
                allowedPageSizes: [10, 25, 50, 100]
            },
            columns: [
                {
                    dataField: "tableName"
                },
                {
                    dataField: "before"
                },
                {
                    dataField: "after"
                },
                {
                    dataField: "propertyName"
                },
                {
                    dataField: "action",
                    customizeText: (cellInfo) => {
                        if (cellInfo.value) {
                            return this.actionTypes.find(x => x.value == cellInfo.value).text;
                        }
                    }
                },
                {
                    dataField: "user.firstName",
                    calculateCellValue: (rowData) => {
                        return rowData.user.firstName + "#" + rowData.user.lastName;
                    }
                },
                {
                    dataField: "discordUserId"
                },
            ]
        })
    }
}
