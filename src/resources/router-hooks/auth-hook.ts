import { lifecycleHooks, Params, RouteNode, inject } from "aurelia";
import { SessionService } from "../../services/session-service";

@lifecycleHooks()
@inject(SessionService)
export class AuthHook {
    constructor(readonly sessionService: SessionService) {
    }

    canLoad(viewModel, params: Params, next: RouteNode, current: RouteNode) {
        console.log(next);
        console.log('start of hook')
        const canProceed = next.data.auth && this.sessionService.isTokenValid() || !next.data.auth;

        if (canProceed) {
            return true;
        }

        return '';
    }
}
