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
    BLACKLISTED_WORDS = 'BlacklistedWords';
    SUPPORT_TICKETS = 'SupportTickets';
    AUDIT_LOG = 'AuditLog';
    TWITCH_SUBSCRIPTIONS ='TwitchSubscriptions';

    constructor(private api: ApiService) {
    }

    getLocalGuild() {
        return this.guild;
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

    async getDiscordCommandDetails(id: string): Promise<discordModels.BaseDiscordCommand> {
        return await this.api.doGet(`Discord/ApplicationCommand/${id}`);
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

    async getDiscordRoles(guildId: string) {
        return this.guild.guild.roles;
    }

    async setActiveFeaturesForDiscord(guildId: string, features: string[]): Promise<discordModels.BaseDiscordServer> {
        return await this.api.doPatch(`DiscordGuild/${guildId}/SetFeatures`, {activeFeatures: features});
    }

    async setActiveAuditFeaturesForDiscord(guildId: string, features: string[]): Promise<discordModels.BaseDiscordServer> {
        return await this.api.doPatch(`DiscordGuild/${guildId}/SetFeatures`, {activeAuditLogFeatures: features});
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

    async setupSupportTicketMessage(guildId: string, request: any): Promise<any> {
        return this.api.doPost(`DiscordGuild/${guildId}/SupportTickets`, request);
    }

    async getDiscordSupportMessages(guildId: string) {
        return this.api.doGet(`DiscordGuild/${guildId}/SupportMessages`);
    }

    async getDiscordMessage(guildId: string, discordMessageId: string) {
        return this.api.doGet(`DiscordGuild/${guildId}/DiscordMessages/${discordMessageId}`);
    }

    async getDiscordMessageSupportTickets(guildId: string, discordMessageId: string) {
        return this.api.doGet(`DiscordGuild/${guildId}/DiscordMessages/${discordMessageId}/SupportTickets`);
    }

    async getSupportTicket(guildId: string, discordMessageId: string, supportTicketId: string) {
        return this.api.doGet(`DiscordGuild/${guildId}/DiscordMessages/${discordMessageId}/SupportTickets/${supportTicketId}`);
    }

    async updateTrackedDiscordMessage(data: any) {
        return this.api.doPatch(`DiscordMessage/${data.id}`, data);
    }

    async toggleDiscordMessageActiveStatus(messageId, active) {
        return this.api.doPatch(`DiscordMessage/${messageId}/ToggleActive`, {active: active});
    }
}
