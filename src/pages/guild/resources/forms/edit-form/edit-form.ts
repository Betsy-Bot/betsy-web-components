import { DiscordForm } from "../../../../../services/models/discord";
import { route } from "@aurelia/router-lite";
import { inject } from "aurelia";
import { DiscordService } from "../../../../../services/discord-service";
import { toast } from "lets-toast";
import DataGrid from "devextreme/ui/data_grid";
import { IRouteViewModel } from "@aurelia/router-lite";
@route({
    path: "forms/:formId",
    title: "Manage Form",
})
@inject(DiscordService)
export class EditForm implements IRouteViewModel {
    constructor(private discordService: DiscordService) {}

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
            dataField: "discordUserId",
        },
        {
            dataField: "discordUsername",
        },
        {
            dataField: "createdDate",
            dataType: "datetime",
        },
    ];

    loading(params) {
        this.formId = params.formId;
    }

    async attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
        this.form = await this.discordService.getDiscordForm(
            this.guildId,
            this.formId
        );

        this.detailTemplate = (container, options) => {
            const data = options.data;
            this.rowCaption.innerText = "Answers for " + data.discordUsername;
            container.appendChild(this.rowCaption);
            new DataGrid(this.rowDetail, {
                columnAutoWidth: true,
                showBorders: true,
                columns: [
                    {
                        dataField: "label",
                    },
                    {
                        dataField: "value",
                    },
                    {
                        dataField: "customId",
                    },
                ],
                dataSource: data.answers.fields,
            });
            container.appendChild(this.rowDetail);
        };
    }

    getLabel(answer) {
        if (answer.label) {
            return answer.label;
        }
        return "No Label Found";
    }

    async save() {
        await this.discordService.updateDiscordForm(this.guildId, this.form);
        toast("Saved Form", { severity: "success" });
    }
}
