import {inject} from 'aurelia-framework';
import {ApiService} from './api-service';

import * as discordModels from "./models/discord";
import {BaseDiscordCommand, SendMessageToChannelRequest} from "./models/discord";

@inject(ApiService)
export class DiscordService {
    guild;

    RESPONSE_MESSAGES = 'ResponseMessages';
    BLOCK_INVITES = 'BlockInvites';
    BLACKLISTED_WORDS = 'BlacklistedWords'

    constructor(private api: ApiService) {
    }

    async exchangeCode(code: string): Promise<discordModels.ExchangeCodeResponse> {
        return this.api.doPost('Discord/OAuth/ExchangeCode', {code: code})
    }

    async createServer(guildId: string): Promise<discordModels.BaseDiscordServer> {
        return this.api.doPost('Discord/Guilds', {guildId: guildId})
    }

    async createResponseMessageCommand(command: BaseDiscordCommand): Promise<discordModels.BaseDiscordCommand> {
        return this.api.doPost('Discord/ApplicationCommand', command);
    }

    async setupServer(guildId: string): Promise<discordModels.BaseDiscordCommand> {
        return this.api.doPost(`Discord/Guilds/${guildId}/Setup`, {});
    }

    async updateResponseMessageCommand(command: BaseDiscordCommand): Promise<discordModels.BaseDiscordCommand> {
        return this.api.doPatch('Discord/ApplicationCommand', command);
    }

    async getResponseMessagesForGuild(guildId: string): Promise<discordModels.BaseDiscordCommand[]> {
        return this.api.doGet(`Discord/Guilds/${guildId}/ResponseMessages`);
    }

    async toggleDiscordCommandActive(guildId: string, discordApplicationCommandId, active: boolean) {
        return this.api.doPatch(`Discord/Guilds/${guildId}/DiscordCommand/${discordApplicationCommandId}/ToggleActive`, {active: active});
    }

    async getDiscordCommandDetails(discordApplicationCommandId: string): Promise<discordModels.BaseDiscordCommand> {
        return this.api.doGet(`Discord/ApplicationCommand?discordApplicationCommandId=${discordApplicationCommandId}`);
    }

    async getDiscordServerInformation(guildId: string): Promise<discordModels.BaseDiscordServer> {
        if (!this.guild || guildId !== this.guild.id) {
            this.guild = this.api.doGet(`Discord/Guilds/${guildId}`);
        }
        return this.guild;
    }

    async getDiscordChannels(guildId: string) {
        return this.api.doGet(`Discord/Guilds/${guildId}/Channels`);
    }

    async setActiveFeaturesForDiscord(guildId: string, features: string[]): Promise<discordModels.BaseDiscordServer> {
        return this.api.doPatch(`Discord/Guilds/${guildId}/SetFeatures`, {activeFeatures: features});
    }

    async setAuditLogChannelId(guildId: string, auditLogChannelId: string[]): Promise<discordModels.BaseDiscordServer> {
        return this.api.doPatch(`Discord/Guilds/${guildId}/SetAuditLogChannel`, {auditLogChannelId: auditLogChannelId});
    }

    async sendMessageToChannel(guildId: string, channelId: string[], message: SendMessageToChannelRequest): Promise<discordModels.BaseDiscordServer> {
        return this.api.doPatch(`Discord/Guilds/${guildId}/Channel/${channelId}/SendMessage`, message);
    }
}
