import {IRouteViewModel, Params, RouteNode, inject} from "aurelia";
import { DiscordService } from "../../services/discord-service";

@inject(DiscordService)
export class Login implements IRouteViewModel {
    constructor(private discordService: DiscordService) {
    }

    load(params: Params, next: RouteNode, current: RouteNode | null): void | Promise<void> {
        const code = current.queryParams.get('code');
        console.log(code)
        const responseToken = this.discordService.getToken(code);
    }
}
