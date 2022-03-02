import { lifecycleHooks, Params, inject } from "aurelia";
import { SessionService } from "../../services/session-service";
import { ToastService } from "../../services/toast-service";
import { IRouteableComponent, Parameters, RoutingInstruction, Navigation } from 'aurelia-direct-router';

@lifecycleHooks()
@inject(SessionService, ToastService)
export class AuthHook implements IRouteableComponent {
    constructor(readonly sessionService: SessionService, readonly toast: ToastService) {
    }

    canLoad?(parameters: Parameters, instruction: RoutingInstruction, navigation: Navigation) {
        const nav = navigation as unknown as { route:{ match: { data: any } }};
        const canProceed = nav.route?.match?.data?.auth && this.sessionService.isTokenValid() || !nav.route?.match?.data?.auth;

        if (canProceed) {
            return true;
        }

        this.toast.error('You must be logged in to access that page!')
        return '';
    }
}
