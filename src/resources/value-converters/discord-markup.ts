import { toHTML } from '@darkguy10/discord-markdown';

export class DiscordMarkupValueConverter {
    toView(value, page) {
        value = toHTML(value, {
            discordCallback: {
                emoji: node => {
                    return `<img src="https://cdn.discordapp.com/emojis/${node.id}.webp?size=24&quality=lossless" alt="${node.name}">`
                }
            }
        });
        value = value.replace(/(\r\n|\r|\n|\\n)/g, '<br>');
        return value;
    }
}
