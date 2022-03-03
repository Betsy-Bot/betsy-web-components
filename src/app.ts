import { IRouteViewModel, route, EventAggregator, inject, IDisposable } from "aurelia";
import { SessionService } from "./services/session-service";
import { routes } from 'aurelia-direct-router';

@routes([
    {
        path: ['', 'home'],
        component: import('./pages/home/home'),
        title: 'Home',
        data: {
            auth: false
        }
    },
    {
        path: 'login',
        component: import('./pages/login/login'),
        title: 'Login',
        data: {
            auth: false
        }
    },
    {
        path: 'guild/:guildId',
        component: import('./pages/guild/guild'),
        title: 'Server Management',
        data: {
            auth: false
        }
    }
])
@inject(EventAggregator, SessionService)
export class App implements IRouteViewModel {
    private userSubscriber: IDisposable;
    private user: any;

    constructor(private eventAggregator, private sessionService) {
    }

    async bound() {
        this.user = await this.sessionService.getUser();
        this.userSubscriber = this.eventAggregator.subscribe('user-updated', payload => {
            this.user = payload.user;
        });
    }
    unbinding() {
        this.userSubscriber.dispose();
    }
}
