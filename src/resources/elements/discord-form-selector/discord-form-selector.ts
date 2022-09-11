import {inject, bindable} from "aurelia-framework";
import {DiscordService} from "../../../services/discord-service";

@inject(DiscordService)
export class DiscordFormSelector {
    constructor(private discordService: DiscordService) {
    }
    @bindable formId: string;
    @bindable label;
    guildId: string;
    forms;

    async attached() {
        this.guildId = await this.discordService.getLocalDiscordGuildId();
        this.forms = await this.discordService.getDiscordForms(this.guildId);
    }
}
