import {bindable, inject} from "aurelia-framework";
import {DiscordService} from "../../../services/discord-service";
import {EMOJIS} from "../../data/discord-emojis";

@inject(DiscordService)
export class DiscordEmojiSelector {
    @bindable value;
    @bindable emojis;
    @bindable required;
    @bindable label;
    @bindable size;

    useDefaultEmojis = false;
    defaultEmojies = EMOJIS;

    constructor(private discordService: DiscordService) {}

    async attached() {
        let emojis;
        if (!this.emojis) {
            emojis = await this.discordService.getLocalGuild().guild.emojis;
        }
        this.emojis = emojis;
        console.log(this.value);
    }

    shouldDisplayEmoji(emojiName) {
        return !emojiName.includes('tone') && !emojiName.includes('_');
    }
}
