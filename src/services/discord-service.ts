import { IEventAggregator, inject } from "aurelia";
import { IRouter } from "@aurelia/router-lite";

import * as discordModels from "./models/discord";
import {
    DiscordForm, DiscordGuildUser,
    IBaseDiscordCommand, IBaseDiscordServer, IDiscordGuild, IDiscordGuildUserInvite, IExchangeCodeResponse,
    ISendMessageToChannelRequest,
} from "./models/discord";
import { ApiService } from "./api-service";

@inject(ApiService, IRouter, IEventAggregator)
export class DiscordService {
    public guildId: string;
    guild: IDiscordGuild;
    guildChannelData = {
        guildId: "",
        data: null,
    };
    discordGuildId: string | undefined;
    messages;
    localUsers: DiscordGuildUser[] = [];

    RESPONSE_MESSAGES = "ResponseMessages";
    DATA_COMMANDS = "DataCommands";
    BLOCK_INVITES = "BlockInvites";
    SUPPORT_TICKETS = "SupportTickets";
    AUDIT_LOG = "AuditLog";
    TWITCH_SUBSCRIPTIONS = "TwitchSubscriptions";
    PAYMENTS = "Payments";
    WELCOME_MESSAGES = "WelcomeMessages";
    AUTO_RESPONDERS = "AutoResponders";
    VERIFICATION = "Verification";
    THREAD_CHANNELS = "ThreadChannels";
    INVITE_LINKS = "InviteLinks"

    public get guildChannels(): any {
        return this.guildChannelData.data;
    }

    public setGuildId(value: string) {
        this.guildId = value;
        this.ea.publish("guild-updated", this.guildId);
    }

    constructor(
        private api: ApiService,
        private router: IRouter,
        private ea: IEventAggregator
    ) {}

    public getLocalGuild() {
        return this.guild;
    }

    getLocalServerId() {
        if (!this.guild) {
            return;
        }
        return this.guild.id;
    }

    public getLocalDiscordGuildId(): string {
        if (!this.guild) {
            return this.guildId;
        }
        return this.guild.guildId;
    }

    getDiscordGuildId() {
        return this.discordGuildId;
    }

    setDiscordGuildId(guildId: string) {
        this.discordGuildId = guildId;
    }

    async exchangeCode(
        code: string,
        redirectUrl?: string
    ): Promise<discordModels.IExchangeCodeResponse> {
        let path = "Discord/OAuth/ExchangeCode";
        if (redirectUrl) {
            path += "?redirectUrl=" + redirectUrl;
        }
        return await this.api.doPost(path, { code: code }) as IExchangeCodeResponse;
    }

    async createServer(
        guildId: string
    ): Promise<discordModels.IBaseDiscordServer> {
        return await this.api.doPost("DiscordGuild", { guildId: guildId }) as IBaseDiscordServer;
    }

    async createApplicationCommand(
        command: IBaseDiscordCommand
    ): Promise<discordModels.IBaseDiscordCommand> {
        return await this.api.doPost("Discord/ApplicationCommand", command) as IBaseDiscordCommand;
    }

    async setupServer(
        guildId: string
    ): Promise<discordModels.IBaseDiscordCommand> {
        return await this.api.doPost(`DiscordGuild/${guildId}/Setup`, {}) as IBaseDiscordCommand;
    }

    async updateApplicationCommand(
        command: IBaseDiscordCommand
    ): Promise<discordModels.IBaseDiscordCommand> {
        return await this.api.doPatch("Discord/ApplicationCommand", command) as IBaseDiscordCommand;
    }

    async getResponseMessagesForGuild(
        guildId: string
    ): Promise<discordModels.IBaseDiscordCommand[]> {
        return await this.api.doGet(`DiscordGuild/${guildId}/ResponseMessages`);
    }

    async getUsersForGuild(guildId: string): Promise<any> {
        return await this.api.doGet(`DiscordGuild/${guildId}/Users`);
    }

    async getDataCommandsForGuild(
        guildId: string
    ): Promise<discordModels.IBaseDiscordCommand[]> {
        return await this.api.doGet(`DiscordGuild/${guildId}/DataCommands`) as IBaseDiscordCommand[];
    }

    async toggleDiscordCommandActive(
        guildId: string,
        discordApplicationCommandId,
        active: boolean
    ) {
        return await this.api.doPatch(
            `DiscordGuild/${guildId}/DiscordCommand/${discordApplicationCommandId}/ToggleActive`,
            { active: active }
        );
    }

    async getDiscordCommandDetails(
        id: string
    ): Promise<discordModels.IBaseDiscordCommand> {
        return await this.api.doGet(`Discord/ApplicationCommand/${id}`) as IBaseDiscordCommand;
    }

    async deleteDiscordCommand(id: string): Promise<any> {
        return await this.api.doDelete(`Discord/ApplicationCommand/${id}`);
    }

    async getDiscordServerInformation(guildId: string): Promise<IDiscordGuild> {
        if (!this.guild || guildId != this.guild.guildId) {
            this.guild = await this.api.doGet(`DiscordGuild/${guildId}`);
            this.messages = null;
        }
        if (!this.guildChannelData.guildId) {
            await this.getDiscordChannels();
        }
        return this.guild;
    }

    async getRequiresLogin(guildId: string): Promise<any> {
        return await this.api.doGet(`DiscordGuild/${guildId}/RequiresLogin`);
    }

    async verifyUser(guildId: string, userId: string): Promise<any> {
        return await this.api.doPost(
            `DiscordGuild/${guildId}/Verify/${userId}`,
            {}
        );
    }

    async verifyLogin(): Promise<any> {
        return await this.api.doPost(`User/Verify`, {});
    }

    async updateVerifiedRole(guildId: string, roleId: string): Promise<any> {
        return await this.api.doPost(`DiscordGuild/${guildId}/VerifiedRole`, {
            verifiedRoleId: roleId,
        });
    }

    async getDiscordChannels() {
        const guildId = this.getLocalDiscordGuildId();
        if (
            this.guildChannelData.guildId == guildId &&
            this.guildChannelData.data
        ) {
            return this.guildChannelData.data;
        }
        if (!this.guildId) {
            return [];
        }
        const channels = await this.api.doGet(
            `DiscordGuild/${guildId}/Channels`
        );
        this.guildChannelData = {
            guildId: guildId,
            data: channels,
        };
        return this.guildChannelData.data;
    }

    getLocalDiscordChannels() {
        return this.guildChannelData.data;
    }

    public async getDiscordRoles() {
        return this.guild.guild?.roles;
    }

    public async setActiveFeaturesForDiscord(
        guildId: string,
        features: string[]
    ): Promise<discordModels.IBaseDiscordServer> {
        return await this.api.doPatch(`DiscordGuild/${guildId}/SetFeatures`, {
            activeFeatures: features,
        });
    }

    public async setActiveAuditFeaturesForDiscord(
        guildId: string,
        features: string[]
    ): Promise<discordModels.IBaseDiscordServer> {
        return await this.api.doPatch(`DiscordGuild/${guildId}/SetFeatures`, {
            activeAuditLogFeatures: features,
        }) as IBaseDiscordServer;
    }

    public async setAuditLogChannelId(
        guildId: string,
        auditLogChannelId: string
    ): Promise<discordModels.IBaseDiscordServer> {
        return await this.api.doPatch(
            `DiscordGuild/${guildId}/SetAuditLogChannel`,
            { auditLogChannelId: auditLogChannelId }
        ) as IBaseDiscordServer;
    }

    public async sendMessageToChannel(
        guildId: string,
        channelId: string,
        message: ISendMessageToChannelRequest
    ): Promise<discordModels.IBaseDiscordServer> {
        return await this.api.doPatch(
            `DiscordGuild/${guildId}/Channel/${channelId}/SendMessage`,
            message
        ) as IBaseDiscordServer;
    }

    public async getDiscordForms(guildId: string) {
        return this.api.doGet(`DiscordForm/Guild/${guildId}/Forms`);
    }

    public getDiscordForm(guildId: string, formId: string) {
        return this.api.doGet(`DiscordForm/Guild/${guildId}/Forms/${formId}`);
    }

    public async createDiscordForm(
        form: DiscordForm
    ): Promise<discordModels.DiscordForm> {
        return await this.api.doPost(
            `DiscordForm/Guild/${this.getLocalDiscordGuildId()}/Forms`,
            form
        ) as DiscordForm;
    }

    public async updateDiscordForm(
        form: DiscordForm
    ): Promise<discordModels.DiscordForm> {
        return await this.api.doPatch(
            `DiscordForm/Guild/${this.getLocalDiscordGuildId()}/Forms`,
            form
        ) as DiscordForm;
    }

    public async setupSupportTicketMessage(
        guildId: string,
        request: any
    ): Promise<any> {
        return await this.api.doPost(
            `DiscordGuild/${guildId}/SupportTickets`,
            request
        );
    }

    public async getDiscordSupportTicketSettings() {
        return await this.api.doGet(
            `DiscordGuild/${this.getLocalDiscordGuildId()}/SupportTicketPanels`
        );
    }

    public async getDiscordWelcomeMessages() {
        return this.api.doGet(
            `DiscordGuild/${this.getLocalDiscordGuildId()}/WelcomeMessages`
        );
    }

    async getDiscordMessageSupportTickets(guildId: string, settingsId: string) {
        return this.api.doGet(
            `DiscordGuild/${guildId}/SupportTickets/${settingsId}/Submissions`
        );
    }

    async getSupportTicket(
        guildId: string,
        settingsId: string,
        supportTicketId: string
    ) {
        return this.api.doGet(
            `DiscordGuild/${guildId}/SupportTickets/${settingsId}/Submissions/${supportTicketId}`
        );
    }

    async closeSupportTicket(supportTicketId: string) {
        return this.api.doPatch(
            `DiscordSupportTicket/${supportTicketId}/Close`,
            {}
        );
    }

    async updateTrackedDiscordMessage(data: any) {
        return this.api.doPatch(`DiscordMessage/${data.id}`, data);
    }

    async toggleDiscordMessageActiveStatus(messageId, active) {
        return this.api.doPatch(`DiscordMessage/${messageId}/ToggleActive`, {
            active: active,
        });
    }

    async createTwitchSubscription(request, guildId) {
        return this.api.doPost(
            `DiscordGuild/${guildId}/TwitchEventSubscriptions`,
            request
        );
    }

    async getTwitchSubscriptions(guildId: string) {
        return this.api.doGet(
            `DiscordGuild/${guildId}/TwitchEventSubscriptions`
        );
    }

    async deleteTwitchSubscription(subscriptionId: string, guildId: string) {
        return this.api.doDelete(
            `DiscordGuild/${guildId}/TwitchEventSubscriptions/${subscriptionId}`
        );
    }

    async getTrackedMessage(guildId: string, messageId: string) {
        return this.api.doGet(
            `DiscordGuild/${guildId}/TrackedMessages/${messageId}`
        );
    }

    async getTrackedMessages(guildId: string) {
        return this.api.doGet(`DiscordGuild/${guildId}/TrackedMessages`);
    }

    async createTrackedMessage(guildId: string, request: any) {
        return this.api.doPost(
            `DiscordGuild/${guildId}/TrackedMessages`,
            request
        );
    }

    async updateTrackedMessage(request: any) {
        return this.api.doPatch(`DiscordTrackedMessage/${request.id}`, request);
    }

    async getSupportTicketSettingsById(ticketId: string) {
        return this.api.doGet(`DiscordSupportTicketSettings/${ticketId}`);
    }

    async getTranscriptPublic(ticketId: string): Promise<boolean> {
        return this.api.doGet(`DiscordSupportTicket/${ticketId}/Public`);
    }

    async getSupportTicketById(ticketId: string) {
        return this.api.doGet(`DiscordSupportTicket/${ticketId}`);
    }

    async deleteSupportTicketBySettingsId(settingsId: string) {
        return this.api.doDelete(`DiscordSupportTicketSettings/${settingsId}`);
    }

    async updateSupportTicketSettings(settings: any) {
        return this.api.doPatch(
            `DiscordSupportTicketSettings/${settings.id}`,
            settings
        );
    }

    async updateAuthorizedUsersForGuild(guild: any, guildId: string) {
        return this.api.doPatch(
            `DiscordGuild/${guildId}/AuthorizedUsers`,
            guild
        );
    }

    async updateGlobalSettingsForGuild(guild: any, guildId: string) {
        return this.api.doPatch(
            `DiscordGuild/${guildId}/GlobalSettings`,
            guild
        );
    }

    async updateReviewSettingsForGuild(guild: any) {
        return this.api.doPatch(
            `DiscordGuild/${this.getLocalDiscordGuildId()}/ReviewSettings`,
            guild
        );
    }

    async updateAutoRolesForGuild(guild: any, guildId: string) {
        return this.api.doPatch(`DiscordGuild/${guildId}/AutoRoles`, guild);
    }

    async updateApiKyesForGuild(guild: any, guildId: string) {
        return this.api.doPatch(`DiscordGuild/${guildId}/ApiKeys`, guild);
    }

    async getResourceMessagesForGuild(guildId: string) {
        if (!this.messages) {
            this.messages = await this.api.doGet(
                `DiscordGuild/${guildId}/Resources/Messages`
            );
        }
        return this.messages;
    }

    getMessageResourceById(id: string) {
        if (this.messages) {
            return this.messages.find((x) => x.id == id);
        }
        return null;
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

    async updateTrackedMessageActiveStatus(message: any) {
        return this.api.doPatch(
            `DiscordTrackedMessage/${message.id}/Active`,
            message
        );
    }

    async createChannelCleaner(cleaner: any) {
        return this.api.doPost(`DiscordChannelCleaner`, cleaner);
    }

    async updateChannelCleaner(cleaner: any) {
        return this.api.doPatch(`DiscordChannelCleaner/${cleaner.id}`, cleaner);
    }

    async testCleanChannelCleaner(cleanerId: string) {
        return this.api.doPost(`DiscordChannelCleaner/${cleanerId}/Clean`, {});
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
        return this.api.doPatch(
            `DiscordAutoroleContainer/${container.id}`,
            container
        );
    }

    async toggleAutoroleContainer(containerId: string) {
        return this.api.doPatch(
            `DiscordAutoroleContainer/${containerId}/ToggleActive`,
            {}
        );
    }

    async getAutoResponders(guildId: string) {
        return this.api.doGet(`DiscordGuild/${guildId}/AutoResponders`);
    }

    async createAutoResponder(responder: any) {
        return this.api.doPost(`DiscordAutoResponder`, responder);
    }

    async updateAutoResponder(responder: any) {
        return this.api.doPatch(
            `DiscordAutoResponder/${responder.id}`,
            responder
        );
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

    async getDiscordReviews() {
        return this.api.doGet(
            `DiscordGuild/${this.getLocalDiscordGuildId()}/DiscordReviews`
        );
    }

    async createDiscordThreadChannels(threadChannel: any) {
        return this.api.doPost(`DiscordThreadChannel`, threadChannel);
    }

    async updateDiscordThreadChannel(threadChannel: any) {
        return this.api.doPatch(
            `DiscordThreadChannel/${threadChannel.id}`,
            threadChannel
        );
    }

    async getDiscordThreadChannelById(threadChannelId: string) {
        return this.api.doGet(`DiscordThreadChannel/${threadChannelId}`);
    }

    async deleteDiscordThreadChannelById(threadChannelId: string) {
        return this.api.doDelete(`DiscordThreadChannel/${threadChannelId}`);
    }

    async deleteDiscordTrackedMessageById(threadChannelId: string) {
        return this.api.doDelete(`DiscordTrackedMessage/${threadChannelId}`);
    }

    async getKeyValueCategories() {
        return this.api.doGet(
            `DiscordGuild/${this.getLocalDiscordGuildId()}/KeyValueCategories`
        );
    }

    async createKeyValueCategory(keyValueCategory: any) {
        return this.api.doPost(`KeyValueCategory`, keyValueCategory);
    }

    async updateKeyValueCategory(keyValueCategory: any) {
        return this.api.doPatch(
            `KeyValueCategory/${keyValueCategory.id}`,
            keyValueCategory
        );
    }

    async getKeyValueCategoryById(keyValueCategory: string) {
        return this.api.doGet(`KeyValueCategory/${keyValueCategory}`);
    }

    async deleteKeyValueCategoryById(keyValueCategory: string) {
        return this.api.doDelete(`KeyValueCategory/${keyValueCategory}`);
    }

    async getAuditLogs() {
        return this.api.doGet(
            `DiscordGuild/${this.getLocalDiscordGuildId()}/AuditLogs`
        );
    }

    async getChannelBackups() {
        return this.api.doGet(
            `DiscordGuild/${this.getLocalDiscordGuildId()}/DiscordChannelBackups`
        );
    }

    async getCustomCommands() {
        return this.api.doGet(
            `DiscordGuild/${this.getLocalDiscordGuildId()}/Commands`
        );
    }

    async createDiscordChannelBackup(item: any) {
        return this.api.doPost(`DiscordChannelBackup`, item);
    }

    async updateDiscordChannelBackup(item: any) {
        return this.api.doPatch(`DiscordChannelBackup/${item.id}`, item);
    }

    async getDiscordChannelBackup(itemId: string) {
        return this.api.doGet(`DiscordChannelBackup/${itemId}`);
    }

    async deleteDiscordChannelBackup(itemId: string) {
        return this.api.doDelete(`DiscordChannelBackup/${itemId}`);
    }

    async getGuildMember(memberId: string) {
        const foundUser = this.localUsers.find(x => x.user.id == memberId);
        if (foundUser) return foundUser;
        const response = await this.api.doGet(
            `User/DiscordUser?discordGuildId=${this.getLocalDiscordGuildId()}&discordUserId=${memberId}`
        )  as DiscordGuildUser;
        this.localUsers.push(response);
        return response;
    }

    async exportTemplate(topics: string[]) {
        return await this.api.doGet(
            `DiscordGuild/${this.getLocalDiscordGuildId()}/ImportTemplate?topics=${topics}`
        );
    }

    async importTemplate(request) {
        return await this.api.doPost(
            `DiscordGuild/${this.getLocalDiscordGuildId()}/ImportTemplate`,
            request
        );
    }

    async toggleCustomBotActive(active: boolean) {
        return await this.api.doPatch(
            `DiscordGuild/${this.getLocalDiscordGuildId()}/ActivateCustomBot`,
            { active: active }
        );
    }

    async getInvites() {
        return await this.api.doGet(
            `DiscordGuild/${this.getLocalDiscordGuildId()}/Invites`
        );
    }

    async getGuildUserInvites() {
        return await this.api.doGet(
            `DiscordGuild/${this.getLocalDiscordGuildId()}/GuildUserInvites`
        ) as IDiscordGuildUserInvite[];
    }
}
