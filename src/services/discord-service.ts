import {inject} from 'aurelia-framework';
import {ApiService} from './api-service';

import * as discordModels from "./models/discord";
import {BaseDiscordCommand, DiscordForm, SendMessageToChannelRequest} from "./models/discord";

@inject(ApiService)
export class DiscordService {
    guild;
    guildChannelData = {
        guildId: null,
        data: null,
    }

    RESPONSE_MESSAGES = 'ResponseMessages';
    DATA_COMMANDS = 'DataCommands';
    BLOCK_INVITES = 'BlockInvites';
    BLACKLISTED_WORDS = 'BlacklistedWords'

    constructor(private api: ApiService) {
    }

    async exchangeCode(code: string): Promise<discordModels.ExchangeCodeResponse> {
        return await this.api.doPost('Discord/OAuth/ExchangeCode', {code: code})
    }

    async createServer(guildId: string): Promise<discordModels.BaseDiscordServer> {
        return await this.api.doPost('DiscordGuild', {guildId: guildId})
    }

    async createApplicationCommand(command: BaseDiscordCommand): Promise<discordModels.BaseDiscordCommand> {
        return await this.api.doPost('Discord/ApplicationCommand', command);
    }

    async setupServer(guildId: string): Promise<discordModels.BaseDiscordCommand> {
        return await this.api.doPost(`DiscordGuild/${guildId}/Setup`, {});
    }

    async updateApplicationCommand(command: BaseDiscordCommand): Promise<discordModels.BaseDiscordCommand> {
        return await this.api.doPatch('Discord/ApplicationCommand', command);
    }

    async getResponseMessagesForGuild(guildId: string): Promise<discordModels.BaseDiscordCommand[]> {
        return await this.api.doGet(`DiscordGuild/${guildId}/ResponseMessages`);
    }

    async getDataCommandsForGuild(guildId: string): Promise<discordModels.BaseDiscordCommand[]> {
        return await this.api.doGet(`DiscordGuild/${guildId}/DataCommands`);
    }

    async toggleDiscordCommandActive(guildId: string, discordApplicationCommandId, active: boolean) {
        return await this.api.doPatch(`DiscordGuild/${guildId}/DiscordCommand/${discordApplicationCommandId}/ToggleActive`, {active: active});
    }

    async getDiscordCommandDetails(discordApplicationCommandId: string): Promise<discordModels.BaseDiscordCommand> {
        return await this.api.doGet(`Discord/ApplicationCommand?discordApplicationCommandId=${discordApplicationCommandId}`);
    }

    async getDiscordServerInformation(guildId: string): Promise<discordModels.BaseDiscordServer> {
        if (!this.guild || guildId !== this.guild.guildId) {
            this.guild = await this.api.doGet(`DiscordGuild/${guildId}`);
        }
        return this.guild;
    }

    async getDiscordChannels(guildId: string) {
        if (this.guildChannelData.guildId == guildId && this.guildChannelData.data) {
            return this.guildChannelData.data;
        }
        const channels = await this.api.doGet(`DiscordGuild/${guildId}/Channels`);
        this.guildChannelData = {
            guildId: guildId,
            data: channels
        }
        return this.guildChannelData.data;
    }

    async setActiveFeaturesForDiscord(guildId: string, features: string[]): Promise<discordModels.BaseDiscordServer> {
        return await this.api.doPatch(`DiscordGuild/${guildId}/SetFeatures`, {activeFeatures: features});
    }

    async setAuditLogChannelId(guildId: string, auditLogChannelId: string[]): Promise<discordModels.BaseDiscordServer> {
        return await this.api.doPatch(`DiscordGuild/${guildId}/SetAuditLogChannel`, {auditLogChannelId: auditLogChannelId});
    }

    async sendMessageToChannel(guildId: string, channelId: string[], message: SendMessageToChannelRequest): Promise<discordModels.BaseDiscordServer> {
        return await this.api.doPatch(`DiscordGuild/${guildId}/Channel/${channelId}/SendMessage`, message);
    }

    async getDiscordForms(guildId: string) {
        return this.api.doGet(`DiscordForm/Guild/${guildId}/Forms`);
    }

    async getDiscordForm(guildId: string, formId: string) {
        return this.api.doGet(`DiscordForm/Guild/${guildId}/Forms/${formId}`);
    }

    async createDiscordForm(guildId: string, form: DiscordForm): Promise<discordModels.DiscordForm> {
        return this.api.doPost(`DiscordForm/Guild/${guildId}/Forms`, form);
    }

    async updateDiscordForm(guildId: string, form: DiscordForm): Promise<discordModels.DiscordForm> {
        return this.api.doPatch(`DiscordForm/Guild/${guildId}/Forms`, form);
    }
}
