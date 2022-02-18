import {IRouteViewModel, Params, RouteNode, inject} from "aurelia";
import { SessionService } from "../../services/session-service";

@inject(SessionService)
export class Login implements IRouteViewModel {
    constructor(private sessionService: SessionService) {
    }

    async canLoad(params: Params, next: RouteNode, current: RouteNode | null): Promise<string | boolean> {
        const code = current.queryParams.get('code');
        await this.sessionService.loginWithOAuthCode(code);

        return 'home';
    }
}
