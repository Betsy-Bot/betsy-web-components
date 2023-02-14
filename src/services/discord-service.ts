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
    discordGuildId;
    messages;

    RESPONSE_MESSAGES = 'ResponseMessages';
    DATA_COMMANDS = 'DataCommands';
    BLOCK_INVITES = 'BlockInvites';
    SUPPORT_TICKETS = 'SupportTickets';
    AUDIT_LOG = 'AuditLog';
    TWITCH_SUBSCRIPTIONS = 'TwitchSubscriptions';
    PAYMENTS = 'Payments';
    WELCOME_MESSAGES = 'WelcomeMessages';
    AUTO_RESPONDERS = 'AutoResponders';
    VERIFICATION = 'Verification';
    THREAD_CHANNELS = 'ThreadChannels';

    get guildChannels() {
        return this.guildChannelData.data;
    }

    constructor(private api: ApiService) {
    }

    getLocalGuild() {
        return this.guild;
    }

    getLocalServerId() {
        if (!this.guild) {
            return;
        }
        return this.guild.id;
    }

    getLocalDiscordGuildId() {
        if (!this.guild) {
            return;
        }
        return this.guild.guildId;
    }

    getDiscordGuildId() {
        return this.discordGuildId;
    }

    setDiscordGuildId(guildId) {
        this.discordGuildId = guildId;
    }

    async exchangeCode(code: string, redirectUrl?: string): Promise<discordModels.ExchangeCodeResponse> {
        let path = 'Discord/OAuth/ExchangeCode';
        if (redirectUrl) {
            path += '?redirectUrl=' + redirectUrl
        }
        return await this.api.doPost(path, {code: code})
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

    async getUsersForGuild(guildId: string): Promise<any> {
        return await this.api.doGet(`DiscordGuild/${guildId}/Users`);
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

    async deleteDiscordCommand(id: string): Promise<any> {
        return await this.api.doDelete(`Discord/ApplicationCommand/${id}`);
    }

    async getDiscordServerInformation(guildId: string): Promise<discordModels.BaseDiscordServer> {
        if (!this.guild || guildId !== this.guild.guildId) {
            this.guild = await this.api.doGet(`DiscordGuild/${guildId}`);
            this.messages = null;
        }
        return this.guild;
    }

    async getRequiresLogin(guildId: string): Promise<any> {
        return await this.api.doGet(`DiscordGuild/${guildId}/RequiresLogin`);
    }

    async verifyUser(guildId: string, userId: string): Promise<any> {
        return await this.api.doPost(`DiscordGuild/${guildId}/Verify/${userId}`, {});
    }

    async verifyLogin(): Promise<any> {
        return await this.api.doPost(`User/Verify`, {});
    }

    async updateVerifiedRole(guildId: string, roleId: string): Promise<any> {
        return await this.api.doPost(`DiscordGuild/${guildId}/VerifiedRole`, {verifiedRoleId: roleId});
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

    async getDiscordSupportTicketSettings() {
        return this.api.doGet(`DiscordGuild/${this.getLocalDiscordGuildId()}/SupportTickets`);
    }

    async getDiscordWelcomeMessages() {
        return this.api.doGet(`DiscordGuild/${this.getLocalDiscordGuildId()}/WelcomeMessages`);
    }

    async getDiscordMessageSupportTickets(guildId: string, settingsId: string) {
        return this.api.doGet(`DiscordGuild/${guildId}/SupportTickets/${settingsId}/Submissions`);
    }

    async getSupportTicket(guildId: string, settingsId: string, supportTicketId: string) {
        return this.api.doGet(`DiscordGuild/${guildId}/SupportTickets/${settingsId}/Submissions/${supportTicketId}`);
    }

    async closeSupportTicket(supportTicketId: string) {
        return this.api.doPatch(`DiscordSupportTicket/${supportTicketId}/Close`, {});
    }

    async updateTrackedDiscordMessage(data: any) {
        return this.api.doPatch(`DiscordMessage/${data.id}`, data);
    }

    async toggleDiscordMessageActiveStatus(messageId, active) {
        return this.api.doPatch(`DiscordMessage/${messageId}/ToggleActive`, {active: active});
    }

    async createTwitchSubscription(request, guildId) {
        return this.api.doPost(`DiscordGuild/${guildId}/TwitchEventSubscriptions`, request);
    }

    async getTwitchSubscriptions(guildId: string) {
        return this.api.doGet(`DiscordGuild/${guildId}/TwitchEventSubscriptions`);
    }

    async deleteTwitchSubscription(subscriptionId: string, guildId: string) {
        return this.api.doDelete(`DiscordGuild/${guildId}/TwitchEventSubscriptions/${subscriptionId}`);
    }

    async getTrackedMessage(guildId: string, messageId: string) {
        return this.api.doGet(`DiscordGuild/${guildId}/TrackedMessages/${messageId}`);
    }

    async getTrackedMessages(guildId: string) {
        return this.api.doGet(`DiscordGuild/${guildId}/TrackedMessages`);
    }

    async createTrackedMessage(guildId: string, request: any) {
        return this.api.doPost(`DiscordGuild/${guildId}/TrackedMessages`, request);
    }

    async updateTrackedMessage(request: any) {
        return this.api.doPatch(`DiscordTrackedMessage/${request.id}`, request);
    }

    async getSupportTicketSettingsById(ticketId: string) {
        return this.api.doGet(`DiscordSupportTicketSettings/${ticketId}`);
    }

    async getTranscriptPublic(ticketId: string) {
        return this.api.doGet(`DiscordSupportTicket/${ticketId}/Public`);
    }
    async getSupportTicketById(ticketId: string) {
        return this.api.doGet(`DiscordSupportTicket/${ticketId}`);
    }

    async deleteSupportTicketBySettingsId(settingsId: string) {
        return this.api.doDelete(`DiscordSupportTicketSettings/${settingsId}`);
    }

    async updateSupportTicketSettings(guildId: string, settings: any) {
        return this.api.doPatch(`DiscordGuild/${guildId}/SupportTickets/${settings.id}`, settings);
    }

    async updateAuthorizedUsersForGuild(guild: any, guildId: string) {
        return this.api.doPatch(`DiscordGuild/${guildId}/AuthorizedUsers`, guild);
    }

    async updateGlobalSettingsForGuild(guild: any, guildId: string) {
        return this.api.doPatch(`DiscordGuild/${guildId}/GlobalSettings`, guild);
    }

    async updateAutoRolesForGuild(guild: any, guildId: string) {
        return this.api.doPatch(`DiscordGuild/${guildId}/AutoRoles`, guild);
    }

    async updateApiKyesForGuild(guild: any, guildId: string) {
        return this.api.doPatch(`DiscordGuild/${guildId}/ApiKeys`, guild);
    }

    async getResourceMessagesForGuild(guildId: string) {
        if (!this.messages) {
            this.messages = this.api.doGet(`DiscordGuild/${guildId}/Resources/Messages`);
        }
        return this.messages;
    }

    async createDiscordMessage(message: any) {
        return this.api.doPost(`DiscordMessage`, message);
    }

    async getDiscordMessageById(id: string) {
        return this.api.doGet(`DiscordMessage/${id}`);
    }

    async updateDiscordMessage(message: any) {
        return this.api.doPatch(`DiscordMessage/${message.id}`, message);
    }

    async createChannelCleaner(cleaner: any) {
        return this.api.doPost(`DiscordChannelCleaner`, cleaner);
    }

    async updateChannelCleaner(cleaner: any) {
        return this.api.doPatch(`DiscordChannelCleaner/${cleaner.id}`, cleaner);
    }

    async testCleanChannelCleaner(cleanerId: string) {
        return this.api.doPost(`DiscordChannelCleaner/${cleanerId}/Clean`, { });
    }

    async deleteChannelCleaner(cleanerId: string) {
        return this.api.doDelete(`DiscordChannelCleaner/${cleanerId}`);
    }

    async getChannelCleaners(guildId: string) {
        return this.api.doGet(`DiscordGuild/${guildId}/DiscordChannelCleaners`);
    }

    async getAutoroleContainers(guildId: string) {
        return this.api.doGet(`DiscordGuild/${guildId}/AutoRoleContainers`);
    }

    async getAutoroleContainer(containerId: string) {
        return this.api.doGet(`DiscordAutoroleContainer/${containerId}`);
    }

    async createAutoroleContainer(container: any) {
        return this.api.doPost(`DiscordAutoroleContainer`, container);
    }

    async updateAutoroleContainer(container: any) {
        return this.api.doPatch(`DiscordAutoroleContainer/${container.id}`, container);
    }

    async toggleAutoroleContainer(containerId: string) {
        return this.api.doPatch(`DiscordAutoroleContainer/${containerId}/ToggleActive`, { });
    }

    async getAutoResponders(guildId: string) {
        return this.api.doGet(`DiscordGuild/${guildId}/AutoResponders`);
    }

    async createAutoResponder(responder: any) {
        return this.api.doPost(`DiscordAutoResponder`, responder);
    }

    async updateAutoResponder(responder: any) {
        return this.api.doPatch(`DiscordAutoResponder/${responder.id}`, responder);
    }

    async getResponderById(responderId: string) {
        return this.api.doGet(`DiscordAutoResponder/${responderId}`);
    }

    async getGiveaways(guildId: string) {
        return this.api.doGet(`DiscordGuild/${guildId}/Giveaways`);
    }

    async createGiveaway(giveaway: any) {
        return this.api.doPost(`DiscordGiveaway`, giveaway);
    }

    async updateGiveaway(giveaway: any) {
        return this.api.doPatch(`DiscordGiveaway/${giveaway.id}`, giveaway);
    }

    async getGiveawayById(giveawayId: string) {
        return this.api.doGet(`DiscordGiveaway/${giveawayId}`);
    }

    async deleteGiveawayById(settingsId: string) {
        return this.api.doDelete(`DiscordGiveaway/${settingsId}`);
    }

    async getPolls(guildId: string) {
        return this.api.doGet(`DiscordGuild/${guildId}/DiscordPolls`);
    }

    async createPoll(giveaway: any) {
        return this.api.doPost(`DiscordPoll`, giveaway);
    }

    async updatePoll(giveaway: any) {
        return this.api.doPatch(`DiscordPoll/${giveaway.id}`, giveaway);
    }

    async getPollById(giveawayId: string) {
        return this.api.doGet(`DiscordPoll/${giveawayId}`);
    }

    async deletePollById(settingsId: string) {
        return this.api.doDelete(`DiscordPoll/${settingsId}`);
    }

    async getDiscordThreadChannels(guildId: string) {
        return this.api.doGet(`DiscordGuild/${guildId}/DiscordThreadChannels`);
    }

    async createDiscordThreadChannels(threadChannel: any) {
        return this.api.doPost(`DiscordThreadChannel`, threadChannel);
    }

    async updateDiscordThreadChannel(threadChannel: any) {
        return this.api.doPatch(`DiscordThreadChannel/${threadChannel.id}`, threadChannel);
    }

    async getDiscordThreadChannelById(threadChannelId: string) {
        return this.api.doGet(`DiscordThreadChannel/${threadChannelId}`);
    }

    async deleteDiscordThreadChannelById(threadChannelId: string) {
        return this.api.doDelete(`DiscordThreadChannel/${threadChannelId}`);
    }

    async getKeyValueCategories() {
        return this.api.doGet(`DiscordGuild/${this.getLocalDiscordGuildId()}/KeyValueCategories`);
    }

    async createKeyValueCategory(keyValueCategory: any) {
        return this.api.doPost(`KeyValueCategory`, keyValueCategory);
    }

    async updateKeyValueCategory(keyValueCategory: any) {
        return this.api.doPatch(`KeyValueCategory/${keyValueCategory.id}`, keyValueCategory);
    }

    async getKeyValueCategoryById(keyValueCategory: string) {
        return this.api.doGet(`KeyValueCategory/${keyValueCategory}`);
    }

    async deleteKeyValueCategoryById(keyValueCategory: string) {
        return this.api.doDelete(`KeyValueCategory/${keyValueCategory}`);
    }

}
