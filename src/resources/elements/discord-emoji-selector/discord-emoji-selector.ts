import {bindable, inject} from "aurelia-framework";
import {DiscordService} from "../../../services/discord-service";

@inject(DiscordService)
export class DiscordEmojiSelector {
    @bindable value;
    @bindable emojis;
    @bindable required;
    @bindable label;
    @bindable size;

    constructor(private discordService: DiscordService) {

    }


    async attached() {
        if (!this.emojis) {
            this.emojis = await this.discordService.getLocalGuild().guild.emojis;
        }
    }
}
