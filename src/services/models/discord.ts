export interface ExchangeCodeResponse {
    token: string,
    id: string
}

export interface DiscordRole {
    discordRoleId: string,
    discordServerId: string
}

export interface BaseDiscordCommand {
    name: string,
    description: string,
    discordGuildId: string,
    discordCommandActions: DiscordCommandAction[]
}

export interface DiscordCommandAction {
    type: number,
    discordMessage: DiscordMessageContent
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
