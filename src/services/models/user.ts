import { IBaseDiscordServer } from "./discord";

export interface IProfileResponse {
    token: string,
    id: string,
    activeServers: IBaseDiscordServer[],
    adminedServers: IBaseDiscordServer[],
    discordId: string,
    avatar: string
}
