import { bindable, inject, IRouter, IEventAggregator } from 'aurelia';
import { SessionService } from "../../../services/session-service";

@inject(SessionService)
export class Navigation {
    constructor(private sessionService: SessionService, @IRouter private router: IRouter, @IEventAggregator readonly ea: IEventAggregator) {
    }

    @bindable() user: any;

    bound() {
        this.ea.subscribe('user-updated', payload => {
            console.log(payload);
            this.user = payload;
        });
    }

    async logout() {
        await this.sessionService.logout();

        await this.router.load('/home');
    }
}
