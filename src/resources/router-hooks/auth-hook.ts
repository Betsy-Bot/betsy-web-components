import { lifecycleHooks, Params, RouteNode, inject } from "aurelia";
import { SessionService } from "../../services/session-service";
import { ToastService } from "../../services/toast-service";

@lifecycleHooks()
@inject(SessionService, ToastService)
export class AuthHook {
    constructor(readonly sessionService: SessionService, readonly toast: ToastService) {
    }

    canLoad(viewModel, params: Params, next: RouteNode, current: RouteNode) {
        const canProceed = next.data.auth && this.sessionService.isTokenValid() || !next.data.auth;

        if (canProceed) {
            return true;
        }

        this.toast.error('You must be logged in to access that page!')
        return '';
    }
}
