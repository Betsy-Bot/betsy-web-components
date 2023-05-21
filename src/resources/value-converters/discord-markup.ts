import { inject } from "aurelia";

import { DiscordService } from "../../services/discord-service";

import { toHTML } from '@darkguy10/discord-markdown';

@inject(DiscordService)
export class DiscordMarkupValueConverter {
    constructor(private discordService: DiscordService) {
    }

    toView(value) {
        const guild = this.discordService.getLocalGuild();
        if (!guild) {
            return value;
        }
        const roles = guild.guild.roles;
        const channels = this.discordService.getLocalDiscordChannels();
        value = toHTML(value, {
            discordCallback: {
                user: node => {
                    return `<span class="discord-mention">@${node.id}</span>`
                },
                emoji: node => {
                    return `<img src="https://cdn.discordapp.com/emojis/${node.id}.webp?size=24&quality=lossless" alt="${node.name}">`
                },
                role: node => {
                    const role = roles.find(x => x.id == node.id);
                    if (!role) { return `@${node.id}` }
                    const hexString = `#${(parseInt(role.color)).toString(16)}`
                    return `<span style="background-color: ${this.hexToRGB(hexString, 0.5)}; color: ${hexString};">@${role.name}</span>`
                },
                channel: node => {
                    const channel = channels.find(x => x.id == node.id);
                    if (!channel) { return `#${node.id}` }
                    return `<span class="discord-mention">@${channel.name}</span>`
                }
            }
        });
        value = value.replace(/(\r\n|\r|\n|\\n)/g, '<br>');
        return value;
    }

    hexToRGB(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16),
            g = parseInt(hex.slice(3, 5), 16),
            b = parseInt(hex.slice(5, 7), 16);

        if (alpha) {
            return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
        } else {
            return "rgb(" + r + ", " + g + ", " + b + ")";
        }
    }
}
