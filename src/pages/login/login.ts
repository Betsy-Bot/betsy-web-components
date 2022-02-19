import {IRouteViewModel, Params, RouteNode, inject} from "aurelia";
import { SessionService } from "../../services/session-service";
import {toast} from "lets-toast";

@inject(SessionService)
export class Login implements IRouteViewModel {
    constructor(private sessionService: SessionService) {
    }

    async canLoad(params: Params, next: RouteNode, current: RouteNode | null): Promise<string | boolean> {
        const code = current.queryParams.get('code');

        try {
            await this.sessionService.loginWithOAuthCode(code);
            const s = new URLSearchParams(window.location.href);
            console.log(s.delete('code')); // Figure out how to delete from url so they don't refresh and it tries twice
            return 'dashboard';
        } catch(e) {
            toast("Failed to exchange code", {severity: 'error'});
        }
    }
}
