import {IRouteViewModel, Params, RouteNode, inject} from "aurelia";
import { SessionService } from "../../services/session-service";
import {toast} from "lets-toast";

@inject(SessionService)
export class Login implements IRouteViewModel {
    constructor(private sessionService: SessionService) {
    }

    async canLoad(params: Params, next: RouteNode, current: RouteNode | null): Promise<string | boolean> {
        const code = current.queryParams.get('code');
        if (code) {
            try {
                await this.sessionService.loginWithOAuthCode(code);
                return 'home';
            } catch(e) {
                if (this.sessionService.isTokenValid()) {
                    return 'home'
                } else {
                    toast("Failed to exchange code", {severity: 'error'});
                }
            }
        }
        return true;
    }
}
