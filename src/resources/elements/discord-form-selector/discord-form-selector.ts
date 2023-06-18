import {
    bindable,
    BindingMode,
    containerless,
    ICustomElementViewModel,
    IEventAggregator,
    inject
} from "aurelia";

import { DiscordService } from "../../../services/discord-service";

@containerless()
@inject(DiscordService, IEventAggregator)
export class DiscordFormSelector implements ICustomElementViewModel {
    constructor(
        private discordService: DiscordService,
        private eventAggregator: IEventAggregator
    ) {}
    @bindable({ mode: BindingMode.twoWay }) formId: string;
    @bindable label;
    @bindable required;
    guildId: string;
    forms;

    async attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
        this.forms = await this.discordService.getDiscordForms(this.guildId);
    }

    //Temp solution because it wasn't clearing it for some reason
    formIdChanged() {
        if (!this.formId) {
            this.eventAggregator.publish("form-cleared");
        }
    }
}
