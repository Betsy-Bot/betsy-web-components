import { IBaseDiscordServer } from "./discord";

export interface IProfileResponse {
    token: string,
    id: string,
    activeServers: IBaseDiscordServer[],
    discordId: string,
    avatar: string
}
