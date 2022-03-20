export interface ExchangeCodeResponse {
    token: string,
    id: string
}

export interface DiscordRole {
    discordRoleId: string,
    discordServerId: string
}

export interface BaseDiscordCommand {
    id?: string,
    name: string,
    private: boolean,
    description: string,
    discordGuildId: string,
    type: DiscordCommandType,
    discordCommandActions: DiscordCommandAction[]
}

export enum DiscordApplicationCommandType
{
    ChatInput = 1,
    User = 2,
    Message = 3
}

export interface DiscordCommandAction {
    id?: string,
    type: number,
    discordMessage: DiscordMessage
}

export interface DiscordMessage {
    id?: string,
    message: DiscordMessageContent
}

export interface DiscordMessageContent {
    content?: string
    embeds?: DiscordMessageEmbed[]
}

export interface DiscordMessageEmbed {
    title?: string;
    description?: string;
    image?: DiscordMessageImage
}

export interface DiscordMessageImage {
    url: string;
}

export interface SendMessageToChannelRequest {
    channelType: DiscordChannelType,
    message: DiscordMessageContent
}

export interface BaseDiscordServer {
    guildId: string,
    ownerId: string,
    roles: DiscordRole[],
    commands: BaseDiscordCommand[]
    activeFeatures: string[]
}

export interface DiscordInvitedWebhookResponse {
    invited: boolean;
    guildId: string;
}

export enum DiscordCommandType {
    ResponseMessage = 1,
    Data = 2
}

export interface DiscordEmbedField {
    name: string,
    value: string,
    inline: boolean
}

export interface DiscordEmbedFooter {
    text: string,
    icon_url: URL
}

export interface DiscordEmbedImage {
    url: URL
}

export class DiscordEmbed {
    title?: string;
    description?: string;
    url?: URL;
    color?: string;
    fields?: DiscordEmbedField[];
    footer?: DiscordEmbedFooter;
    image?: DiscordEmbedImage;
    thumbnail?: DiscordEmbedImage;
    timestamp?: Date
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
    GuildStageVoice = 13
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
    Attachment = 11
}

export class DiscordForm {
    title?: string;
    description?: string;
    customId: string;
    private?: boolean;
    submissions: DiscordFormSubmission[]
    formData: DiscordFormData
}

export class DiscordFormData {
    components: DiscordComponentWrapper[]
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
}

export class DiscordComponentWrapper {
    type: DiscordComponentType
    components: DiscordComponent[]
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
    style?: number;
    min_length?: number;
    max_length?: number;
    placeholder?: string;
    required?: boolean;
}

export enum DiscordCommandActionType {
    MessageResponse = 1,
    MessageChannel = 2,
    RoleGive = 3,
    RoleRemove = 4,
    AnnounceMessage = 5,
    AnnounceEmbed = 6,
    OpenForm = 7,
    SendSubmissionMessage = 8,
    SendSubmitData = 9
}
