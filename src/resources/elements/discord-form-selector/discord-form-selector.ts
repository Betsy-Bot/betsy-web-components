import {inject, bindable} from "aurelia-framework";
import {DiscordService} from "../../../services/discord-service";
import {EventAggregator} from "aurelia-event-aggregator";

@inject(DiscordService, EventAggregator)
export class DiscordFormSelector {
    constructor(private discordService: DiscordService, private eventAggregator: EventAggregator) {
    }
    @bindable formId: string;
    @bindable label;
    @bindable required;
    guildId: string;
    forms;

    async attached() {
        this.guildId = await this.discordService.getLocalDiscordGuildId();
        this.forms = await this.discordService.getDiscordForms(this.guildId);
    }

    //Temp solution because it wasn't clearing it for some reason
    formIdChanged() {
        if (!this.formId) {
            this.eventAggregator.publish('form-cleared');
        }
    }
}
