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
    content: string
    embeds: DiscordMessageEmbed[]
}

export interface DiscordMessageEmbed {
    title: string;
    description: string;
    image: DiscordMessageImage
}

export interface DiscordMessageImage {
    url: string;
}

export interface BaseDiscordServer {
    guildId: string,
    ownerId: string,
    roles: DiscordRole[],
    commands: BaseDiscordCommand[]
}

export interface DiscordInvitedWebhookResponse {
    invited: boolean;
    guildId: string;
}

export enum DiscordCommandType {
    ResponseMessage = 1
}

export interface EmbedField {
    name: string,
    value: string,
    inline: boolean
}

export interface EmbedFooter {
    text: string,
    icon_url: URL
}

export interface EmbedImage {
    url: URL
}

export class Embed {
    title: string;
    description: string;
    url: URL;
    color: string;
    fields: EmbedField[];
    footer: EmbedFooter;
    image: EmbedImage;
    thumbnail: EmbedImage;
    timestamp: Date
}

