import {Router} from 'aurelia-router';
import {inject} from "aurelia-framework";
import {EventAggregator} from "aurelia-event-aggregator";
import {DiscordService} from 'services/discord-service';

@inject(EventAggregator, DiscordService, Router)
export class KeyValueStorage {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }
    guildId: string;
    params;
    items = [];

    activate(params) {
        this.params = params;
        this.guildId = this.params.guildId;
    }

    createFunction() {
        this.goToItem({id: 0});
    }

    goToItem(item) {
        this.router.navigate(`/guild/${this.guildId}/resources/key-value-storage/${item.id}`)
    }

}
