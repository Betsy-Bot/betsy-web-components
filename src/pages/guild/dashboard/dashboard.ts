import {DiscordService} from "services/discord-service";
import './dashboard.scss';
import {inject} from "aurelia-framework";
import {get} from "https";

@inject(DiscordService)
export class Dashboard {
    constructor(private discordService: DiscordService) {
    }

    guildId;
    guild;
    channels;

    stats = [
        {
            prefix: '~',
            title: 'Member Count',
            property: 'approximateMemberCount'
        },
        {
            title: 'Emoji Count',
            function: 'getEmojiCount'
        },
        {
            title: 'Channel Count',
            function: 'getChannelCount'
        }
    ]

    async activate(params) {
        this.guildId = params.guildId as string;
    }

    async attached() {
        [this.guild, this.channels] = await Promise.all([
            await this.discordService.getDiscordServerInformation(this.guildId),
            await this.discordService.getDiscordChannels(this.guildId)
        ])
    }

    getStat(stat) {
        if (stat.property) {
            return this.guild.guild[stat.property];
        }
        return this[stat.function]();
    }

    getEmojiCount() {
        return this.guild.guild.emojis.length
    }

    getChannelCount() {
        return this.channels.length
    }
}
