import { lifecycleHooks } from "aurelia";
import { IRouteableComponent, Parameters, RoutingInstruction, Navigation } from 'aurelia-direct-router';

@lifecycleHooks()
export class AuthHook implements IRouteableComponent {

    canLoad?(parameters: Parameters, instruction: RoutingInstruction, navigation: Navigation) {
        const nav = navigation as unknown as { route:{ match: { data: any } }};
        const token = window.localStorage['jwt_token'];
        if (token) {
            const validToken = token && token != undefined && token != null && token != 'null' && token != ''
            const canProceed = nav.route?.match?.data?.auth && validToken || !nav.route?.match?.data?.auth;

            if (canProceed) {
                console.log('canProceed')
                return true;
            }
        }

        return '';
    }
}
