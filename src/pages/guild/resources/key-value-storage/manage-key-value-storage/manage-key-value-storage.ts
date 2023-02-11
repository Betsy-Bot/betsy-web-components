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
    item = {};
    itemId: string;
    isNew: boolean;
    itemTemplate = {
        discordServerId: '',
    }

    activate(params) {
        this.params = params;
        this.guildId = this.params.guildId;
        this.itemId = this.params.itemId;
    }

    async attached() {
        if (!this.itemId || this.itemId == '0') {
            this.isNew = true;
            this.item = this.itemTemplate;
        } else {
            this.item = await this.discordService.getKeyValueCategoryById(this.itemId);
        }
        this.itemTemplate.discordServerId = this.discordService.getLocalGuild().id;
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
