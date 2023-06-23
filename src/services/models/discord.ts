export interface IExchangeCodeResponse {
    token: string;
    id: string;
}

export interface IDiscordRole {
    discordRoleId: string;
    discordServerId: string;
}

export interface IBaseDiscordCommand {
    id?: string;
    name: string;
    private: boolean;
    active: boolean;
    description: string;
    discordGuildId: string;
    type: DiscordCommandType;
    discordCommandActions: IDiscordCommandAction[];
    commandInformation?: IDiscordApplicationCommand;
    responseMessage?: IDiscordMessageContent;
}

export interface IDiscordApplicationCommand {
    id?: string;
    name: string;
    description: string;
    options?: IDiscordApplicationCommandOption[] | null;
    defaultPermission?: boolean;
    type: DiscordApplicationCommandType | null;
}

export interface IDiscordApplicationCommandOption {
    type: DiscordApplicationCommandOptionType;
    apiPath: string;
    name: string;
    description: string;
    required: boolean | null;
    choices: IDiscordApplicationCommandOptionChoice[] | null;
    channelTypes: DiscordChannelType[] | null;
    minValue: any;
    maxValue: any;
    autocomplete: boolean | null;
}

export interface IDiscordApplicationCommandOptionChoice {
    name: string;
    value: string | number | boolean;
}

export interface IDiscordPermission {
    id: string;
    type: DiscordPermissionType;
    permission: boolean;
}

export enum DiscordPermissionType {
    Role = 1,
    User = 2
}

export enum DiscordApplicationCommandType {
    ChatInput = 1,
    User = 2,
    Message = 3,
}

export interface IDiscordCommandAction {
    id?: string;
    type: number;
    discordChannelId?: number;
    discordCategoryId?: number;
    restRequestMetadata?: any;
    discordMessage: IDiscordMessage;
}

export interface IDiscordMessage {
    id?: string;
    message: IDiscordMessageContent;
}

export interface IDiscordMessageContent {
    content?: string;
    embeds?: DiscordEmbed[];
}

export interface IDiscordMessageImage {
    url: string;
}

export interface ISendMessageToChannelRequest {
    sendTime?: string;
    channelType: DiscordChannelType;
    message: IDiscordMessageContent;
}

export interface IBaseDiscordServer {
    guildId: string;
    ownerId: string;
    roles: IDiscordRole[];
    commands: IBaseDiscordCommand[];
    activeFeatures: string[];
}

export interface IDiscordInvitedWebhookResponse {
    invited: boolean;
    guildId: string;
}

export enum DiscordCommandType {
    ResponseMessage = 1,
    Data = 2,
}

export interface IDiscordEmbedField {
    name: string;
    value: string;
    inline: boolean;
}

export interface IDiscordEmbedFooter {
    text: string;
    icon_url: URL;
}

export interface IDiscordEmbedImage {
    url: URL;
    height: number;
    width: number;
}

export interface IDiscordEmbedVideo {
    url: URL;
    height: number;
    width: number;
}

export class DiscordEmbed {
    title?: string;
    description?: string;
    url?: URL;
    color?: string;
    fields?: IDiscordEmbedField[];
    footer?: IDiscordEmbedFooter;
    image?: IDiscordEmbedImage;
    thumbnail?: IDiscordEmbedImage;
    video?: IDiscordEmbedVideo;
    timestamp?: Date;
}

export enum DiscordChannelType {
    GuildText = 0,
    Dm = 1,
    GuildVoice = 2,
    GroupDm = 3,
    GuildCategory = 4,
    GuildNews = 5,
    GuildStore = 6,
    GuildNewsThread = 10,
    GuildPublicThread = 11,
    GuildPrivateThread = 12,
    GuildStageVoice = 13,
}

export enum DiscordApplicationCommandOptionType {
    SubCommand = 1,
    SubCommandGroup = 2,
    String = 3,
    Integer = 4,
    Boolean = 5,
    User = 6,
    Channel = 7,
    Role = 8,
    Mentionable = 9,
    Number = 10,
    Attachment = 11,
}

export class DiscordForm {
    title?: string;
    description?: string;
    customId: string;
    private?: boolean;
    submissions: DiscordFormSubmission[];
    formData: DiscordFormData;
}

export class DiscordFormData {
    components: DiscordComponentWrapper[];
}

export class DiscordFormSubmission {
    discordUserId: string;
    discordUsername: string;
    answers: DiscordFormFieldAnswer[];
}

export class DiscordFormFieldAnswer {
    label: string;
    value: string;
    custom_id: string;
    fields: any[];
}

export class DiscordComponentWrapper {
    type: DiscordComponentType;
    components: DiscordComponent[];
}

export class DiscordSupportTicketSettings {
    categoryId?: string;
    logChannelId?: string;
    assignedRoles?: string[];
    discordMessageId?: string;
    discordMessage?: IDiscordMessage;
}

export enum DiscordComponentType {
    ActionRow = 1,
    Button = 2,
    MenuSelect = 3,
    TextInput = 4,
}

export enum DiscordTextInputType {
    Short = 1,
    Paragraph = 2,
}

export class DiscordComponent {
    type: DiscordComponentType;
    label: string;
    custom_id: string;
    style?: DiscordButtonStyle;
    min_length?: number;
    max_length?: number;
    placeholder?: string;
    required?: boolean;
    emoji: DiscordEmoji
}

export enum DiscordButtonStyle {
    Primary = 1,
    Secondary = 2,
    Success = 3,
    Danger = 4,
    Link = 5,
}

export class DiscordEmoji {
    name: string;
    animated: boolean;
}

export enum DiscordCommandActionType {
    MessageResponse = 1,
    MessageChannel = 2,
    RoleGive = 3,
    RoleRemove = 4,
    AnnounceMessage = 5,
    AnnounceEmbed = 6,
    OpenForm = 7,
    SendGetRequest = 8,
    SendPostRequest = 9,
    SendPutRequest = 10,
    SendPatchRequest = 11,
    SendDeleteRequest = 12,
}

export class DiscordGuildUser {
    user: DiscordGuildUserUser;
    joinedAt: string;
}

export class DiscordGuildUserUser {
    id: string;
    username: string;
    avatar: string;
}
