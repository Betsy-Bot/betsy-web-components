import {Router} from 'aurelia-router';
import {inject} from "aurelia-framework";
import {EventAggregator} from "aurelia-event-aggregator";
import {DiscordService} from 'services/discord-service';
import {toast} from "lets-toast";

@inject(EventAggregator, DiscordService, Router)
export class KeyValueStorage {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }
    guildId: string;
    params;
    item;
    itemId: string;
    isNew: boolean;
    itemTemplate = {
        discordServerId: '',
        storedValues: [
            {
                key: '1',
                value: '1',
                used: false
            },
            {
                key: '2',
                value: '2',
                used: true
            },
            {
                key: '3',
                value: '3',
                used: false
            },
            {
                key: '4',
                value: '4',
                used: true
            }
        ]
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
        console.log(this.item);
        this.loading = false;
    }

    insertRow() {
        console.log('inserted');
    }

    async save() {
        try {
            if (this.isNew) {
                this.item = await this.discordService.createKeyValueCategory(this.item);
            } else {
                this.item = await this.discordService.updateKeyValueCategory(this.item);
            }
            toast(`Key Value Category ${this.isNew ? 'Created' : 'Updated'}!`);
            this.router.navigateBack();
        } catch(e) {
            console.log(e);
            toast('Failed to create key value category', {severity: 'error'})
        }
    }
}
