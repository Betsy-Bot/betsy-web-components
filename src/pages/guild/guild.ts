import { routes, IRouter } from 'aurelia-direct-router';
import { inject, IRouteViewModel, Params, RouteNode, IEventAggregator } from "aurelia";

@routes([
    {
        path: 'dashboard',
        component: import('./dashboard/dashboard'),
        title: 'Dashboard',
        data: {
            auth: true
        }
    },
    {
        path: 'response-message',
        component: import('./response-message/response-message'),
        title: 'Response Messages',
        data: {
            auth: true
        }
    },
    {
        path: 'response-message/create',
        component: import('./response-message/create-response-message/create-response-message'),
        title: 'Response Messages',
        data: {
            auth: true
        }
    },
    {
        path: 'response-message/:discordApplicationCommandId',
        component: import('./response-message/edit-response-message/edit-response-message'),
        title: 'Response Messages',
        data: {
            auth: true
        }
    }
])

@inject(IEventAggregator, IRouter)
export class Guild implements IRouteViewModel {
    constructor(private eventAggregator: IEventAggregator, private router: IRouter) {
    }

    guildId: string;

    load(params: Params, next: RouteNode, current: RouteNode) {
        this.guildId = params.guildId;
        this.eventAggregator.publish('guild-updated', params.guildId);
        if (current.path == `guild/${params.guildId}`) {
            this.router.load(`/guild/${params.guildId}/dashboard`);
        }
    }
}
