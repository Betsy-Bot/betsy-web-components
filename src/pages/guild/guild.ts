import {inject, IRouteViewModel, Params, RouteNode, IEventAggregator, route} from "aurelia";

// @ts-ignore
@route({
    routes: [
        {
            path: 'response-message',
            component: import('./response-message/response-message'),
            title: 'Guild Response Messages',
        },
        {
            path: 'response-message/create',
            component: import('./response-message/create-response-message/create-response-message'),
            title: 'Guild Response Messages',
        }
    ]
})
@inject(IEventAggregator)
export class Guild implements IRouteViewModel {
    constructor(private eventAggregator: IEventAggregator) {
    }

    guildId: string;

    load(params: Params, next: RouteNode, current: RouteNode) {
        this.guildId = params.guildId;
    }

    binding() {
        this.eventAggregator.publish('guild-updated', this.guildId)
    }
}
