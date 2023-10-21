import { inject } from 'aurelia';
import { Params, route } from '@aurelia/router-lite';
import { IRouteViewModel } from '@aurelia/router-lite';

import { DiscordService } from '../../../../../services/discord-service';
import { DiscordComponentType, DiscordForm } from '../../../../../services/models/discord';

import DataGrid from 'devextreme/ui/data_grid';
import { toast } from 'lets-toast';
@route({
    path: 'forms/:formId',
    title: 'Manage Form',
})
@inject(DiscordService)
export class ManageForm implements IRouteViewModel {
    constructor(private discordService: DiscordService) {}
    guildId: string;
    formId: string;
    showingSubmissions = false;
    detailTemplate;
    rowDetail;
    rowCaption;
    isNew = false;

    form: DiscordForm;

    columns = [
        {
            dataField: 'discordUserId',
        },
        {
            dataField: 'discordUsername',
        },
        {
            dataField: 'createdDate',
            dataType: 'datetime',
        },
    ];

    formTemplate: DiscordForm = {
        customId: '',
        title: '',
        description: '',
        submissions: [],
        formData: {
            components: [
                {
                    type: DiscordComponentType.ActionRow,
                    components: [
                        {
                            custom_id: '',
                            type: DiscordComponentType.TextInput,
                            label: '',
                        },
                    ],
                },
            ],
        },
    };

    loading(params: Params) {
        this.formId = params.formId!;
        if (this.formId == '0') {
            this.form = this.formTemplate;
            this.isNew = true;
        }
    }

    async attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
        if (!this.isNew) {
            this.form = await this.discordService.getDiscordForm(
                this.guildId,
                this.formId
            );
        }

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
        return 'No Label Found';
    }

    async save() {
        if (!this.isNew) {
            await this.discordService.updateDiscordForm(this.form);
            toast('Saved Form', { severity: 'success' });
        } else {
            await this.discordService.createDiscordForm(this.form);
            toast('Form Created!');
        }
    }
}
