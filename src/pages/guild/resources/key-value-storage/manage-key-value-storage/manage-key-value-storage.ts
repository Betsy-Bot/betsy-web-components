import { Router } from 'aurelia-router';
import { inject } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";
import { DiscordService } from 'services/discord-service';
import { toast } from "lets-toast";
import DataGrid from 'devextreme/ui/data_grid';

@inject(EventAggregator, DiscordService, Router)
export class KeyValueStorage {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }
    guildId: string;
    params;
    item;
    itemId: string;
    isNew: boolean;
    table;
    itemTemplate = {
        discordServerId: '',
        storedValues: []
    }

    columns = [
        {
            dataField: "key"
        },
        {
            dataField: "value"
        },
        {
            dataField: "used",
            dataType: 'boolean'
        }
    ]

    loading = true;
    dataGrid;

    activate(params) {
        this.params = params;
        this.guildId = this.params.guildId;
        this.itemId = this.params.itemId as string;
    }

    async attached() {
        if (!this.itemId || this.itemId == '0') {
            this.itemTemplate.discordServerId = this.discordService.getLocalGuild().id;
            this.isNew = true;
            this.item = this.itemTemplate;
        } else {
            this.item = await this.discordService.getKeyValueCategoryById(this.itemId);
        }
        this.dataGrid = new DataGrid(this.table, {
            dataSource: this.item.storedValues,
            showBorders: true,
            editing: {
                mode: 'batch',
                allowUpdating: true,
                allowAdding: true,
                allowDeleting: true,
                selectTextOnEditStart: true,
                startEditAction: 'click',
            },
            onSaved: ({ changes }) => {
                for (const object of changes) {
                    const index = this.item.storedValues.findIndex(x => x.key == object.data.key);
                    this.item.storedValues[index] = object.data;
                }
                this.save();
            },
            // @ts-ignore
            columns: this.columns,
        })
        this.loading = false;
    }

    async save() {
        try {
            if (this.isNew) {
                this.item = await this.discordService.createKeyValueCategory(this.item);
            } else {
                this.item = await this.discordService.updateKeyValueCategory(this.item);
            }
            toast(`Key Value Category ${this.isNew ? 'Created' : 'Updated'}!`);
        } catch(e) {
            console.log(e);
            toast('Failed to create key value category', { severity: 'error' })
        }
    }
}