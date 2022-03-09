import { Params, RouteNode, inject} from "aurelia";
import { SessionService } from "../../services/session-service";
import {toast} from "lets-toast";
import { IRouteableComponent, Parameters, RoutingInstruction, Navigation } from 'aurelia-direct-router';

@inject(SessionService)
export class Login implements IRouteableComponent {
    constructor(private sessionService: SessionService) {
    }

    async canLoad?(parameters: Parameters, instruction: RoutingInstruction, navigation: Navigation) {
        const code = parameters.code as string;
        if (code) {
            try {
                await this.sessionService.loginWithOAuthCode(code);
                return 'home';
            } catch(e) {
                toast("Failed to exchange code", {severity: 'error'});
            }
        }
        return true;
    }

    detaching(): void | Promise<void> {
        const params = new URLSearchParams(window.location.search);
        params.delete('code')
    }
}
