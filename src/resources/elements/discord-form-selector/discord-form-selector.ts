import {inject, bindable} from "aurelia-framework";
import {DiscordService} from "../../../services/discord-service";

@inject(DiscordService)
export class DiscordFormSelector {
    constructor(private discordService: DiscordService) {
    }

    @bindable guildId: string;
    @bindable formId: string;
    @bindable label;

    forms;

    async attached() {
        this.forms = await this.discordService.getDiscordForms(this.guildId);
    }
}
