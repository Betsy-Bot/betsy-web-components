import { BaseDiscordServer } from "./discord";

export interface ProfileResponse {
    token: string,
    id: string,
    activeServers: BaseDiscordServer[],
    discordId: string,
    avatar: string
}
