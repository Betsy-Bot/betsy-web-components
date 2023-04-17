import {
    inject,
    bindable,
    customElement,
    ICustomElementViewModel,
} from "aurelia";
import { DiscordService } from "../../../services/discord-service";
import { IEventAggregator } from "aurelia";
import template from "./discord-form-selector.html";

@customElement({
    name: "discord-form-selector",
    template: template,
    containerless: true,
})
@inject(DiscordService, IEventAggregator)
export class DiscordFormSelector implements ICustomElementViewModel {
    constructor(
        private discordService: DiscordService,
        private eventAggregator: IEventAggregator
    ) {}
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
            this.eventAggregator.publish("form-cleared");
        }
    }
}
