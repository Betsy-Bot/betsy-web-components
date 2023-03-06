import { DiscordForm } from "../../../../../services/models/discord";
import { Router } from 'aurelia-router';
import { inject } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";
import { DiscordService } from 'services/discord-service';
import { toast } from "lets-toast";
import DataGrid from "devextreme/ui/data_grid";

@inject(EventAggregator, DiscordService, Router)
export class EditForm {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }

    params;
    guildId;
    formId;
    showingSubmissions = false;
    detailTemplate;
    rowDetail;
    rowCaption;

    form: DiscordForm;

    columns = [
        {
            dataField: "discordUserId"
        },
        {
            dataField: "discordUsername"
        },
        {
            dataField: "createdDate",
            dataType: 'datetime',
        }
    ]

    activate(params) {
        this.params = params;
        this.guildId = this.params.guildId;
        this.formId = this.params.formId;
    }

    async attached() {
        this.form = await this.discordService.getDiscordForm(this.guildId, this.formId);

        this.detailTemplate = (container, options) => {
            const data = options.data;
            this.rowCaption.innerText = 'Answers for ' + data.discordUsername;
            container.appendChild(this.rowCaption);
            new DataGrid(this.rowDetail, {
                columnAutoWidth: true,
                showBorders: true,
                columns: [
                    {
                        dataField: 'label',
                    },
                    {
                        dataField: 'value',
                    },
                    {
                        dataField: 'customId',
                    }
                ],
                dataSource: data.answers.fields
            });
            container.appendChild(this.rowDetail);
        }
    }

    getLabel(answer) {
        if (answer.label) {
            return answer.label;
        }
        return 'No Label Found'
    }

    async save() {
        await this.discordService.updateDiscordForm(this.guildId, this.form);
        toast("Saved Form", { severity: "success" });
    }
}
