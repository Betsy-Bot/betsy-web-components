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
    discordServerId: string
}

export interface BaseDiscordServer {
    guildId: string,
    ownerId: string,
    roles: DiscordRole[],
    commands: BaseDiscordCommand[]
}
