import {IRouteViewModel, route, EventAggregator, inject, IDisposable} from "aurelia";
import { SessionService } from "./services/session-service";

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
        }
    ]
})

@inject(EventAggregator, SessionService)
export class App implements IRouteViewModel {
    private userSubscriber: IDisposable;
    private user: any;

    constructor(private eventAggregator, private sessionService) {
    }

    attached() {
        this.user = this.sessionService.currentUser;
        console.log(this.user);
    }

    bound() {
        this.userSubscriber = this.eventAggregator.subscribe('user-updated', payload => {
            this.user = payload;
            console.log(this.user);
            console.log('^ update')
        });
    }

    unbinding() {
        this.userSubscriber.dispose();
    }
}
