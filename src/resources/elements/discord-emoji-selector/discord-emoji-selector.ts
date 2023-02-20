import {bindable, inject} from "aurelia-framework";
import {DiscordService} from "../../../services/discord-service";
import {EMOJIS} from "../../data/discord-emojis";
import data from '@emoji-mart/data'
import { Picker } from 'emoji-mart'

@inject(DiscordService)
export class DiscordEmojiSelector {
    @bindable value;
    @bindable emojis;
    @bindable required;
    emojiSelector;
    picker: Picker;
    selectingEmoji = false;

    constructor(private discordService: DiscordService) {}

    async attached() {
        const guildId = this.discordService.getDiscordGuildId();
        const guild = this.discordService.getLocalGuild();

        let emojis;
        if (!this.emojis) {
            emojis = guild.guild.emojis;
        }
        this.emojis = emojis;
        this.picker = new Picker({
            data: data,
            onEmojiSelect: (data) => {this.selectEmoji(data)},
            categoryIcons: {
                guild: {
                    src: `https://cdn.discordapp.com/icons/${guildId}/${guild.guild.icon}.png`
                }
            },
            emojiVersion: 12,
            custom: [{
                id: 'guild',
                name: 'Guild',
                emojis: this.buildCustomEmojis()
            }]

        });
        this.emojiSelector.appendChild(this.picker);
    }

    selectEmoji(data) {
        this.selectingEmoji = false;
        const found = EMOJIS.find(x => x.primaryName == data.id);
        if (found) {
            this.value = found;
        } else {
            this.value = data;
        }
    }

    get displayEmoji() {
        if (this.value) {
            return this.value.name
        }
        return null;
    }

    buildCustomEmojis() {
        let formattedEmojis = [];
        for (const emoji of this.emojis) {
            formattedEmojis.push({
                name: emoji.name,
                id: emoji.id,
                skins: [{ src: `https://cdn.discordapp.com/emojis/${emoji.id}.webp?size=24&quality=lossless`}]
            })
        }
        return formattedEmojis;
    }

    get isEmoji() {
        return /\p{Extended_Pictographic}/u.test(this.value.name); // true :)
    }
}
