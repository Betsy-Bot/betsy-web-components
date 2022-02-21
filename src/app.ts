import {IRouteViewModel, route, EventAggregator, inject, IDisposable} from "aurelia";
import { SessionService } from "./services/session-service";

// @ts-ignore
@route({
    routes: [
        {
            path: ['', 'home'],
            component: import('./pages/home/home'),
            title: 'Home'
        },
        {
            path: 'login',
            component: import('./pages/login/login'),
            title: 'Login',
        },
        {
            path: 'guild/:guildId',
            component: import('./pages/guild/guild'),
            title: 'Guild',
        },
        {
            path: 'guild/:guildId/response-message',
            component: import('./pages/guild/response-message/response-message'),
            title: 'Guild Response Messages',
        },
        {
            path: 'guild/:guildId/response-message/create',
            component: import('./pages/guild/response-message/create-response-message/create-response-message'),
            title: 'Guild Response Messages',
        }
    ]
})

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
