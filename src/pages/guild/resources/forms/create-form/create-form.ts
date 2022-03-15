import {DiscordForm} from "../../../../../services/models/discord";
import {Router} from 'aurelia-router';
import {inject} from "aurelia-framework";
import {EventAggregator} from "aurelia-event-aggregator";
import {DiscordService} from 'services/discord-service';

@inject(EventAggregator, DiscordService, Router)
export class CreateForm {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }
    params;
    guildId;

    form: DiscordForm = {
        customId: "",
        title: "",
        description: "",
        submissions: [],
        formData: {
            components: []
        }
    };

    activate(params) {
        this.params = params;
        this.guildId = this.params.guildId;
    }

    async save() {
        console.log('saving');
        await this.discordService.createDiscordForm(this.guildId, this.form);
    }
}
