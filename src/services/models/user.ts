import { IBaseDiscordServer } from "./discord";

export interface ProfileResponse {
    token: string,
    id: string,
    activeServers: IBaseDiscordServer[],
    discordId: string,
    avatar: string
}
