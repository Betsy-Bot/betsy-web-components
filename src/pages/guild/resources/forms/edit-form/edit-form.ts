import {DiscordForm} from "../../../../../services/models/discord";
import {Router} from 'aurelia-router';
import {inject} from "aurelia-framework";
import {EventAggregator} from "aurelia-event-aggregator";
import {DiscordService} from 'services/discord-service';

@inject(EventAggregator, DiscordService, Router)
export class EditForm {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }

    params;
    guildId;
    formId;
    showingSubmissions = false;

    form: DiscordForm;

    activate(params) {
        this.params = params;
        this.guildId = this.params.guildId;
        this.formId = this.params.formId;
    }

    async attached() {
        this.form = await this.discordService.getDiscordForm(this.guildId, this.formId);
        console.log('this.form', this.form);
    }

    async save() {
        await this.discordService.updateDiscordForm(this.guildId, this.form);
    }
}
