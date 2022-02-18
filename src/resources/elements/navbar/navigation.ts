import { bindable, inject, IRouter } from 'aurelia';
import { SessionService } from "../../../services/session-service";

@inject(SessionService)
export class Navigation {
    constructor(private sessionService: SessionService, @IRouter private router: IRouter) {
    }

    @bindable() user: any;

    async logout() {
        console.log(this.sessionService)
        await this.sessionService.logout();

        await this.router.load('/home');
    }
}
