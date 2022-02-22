import {inject, IRouteViewModel, Params, RouteNode, IEventAggregator, route} from "aurelia";

// @ts-ignore
@route({
    routes: [
        {
            path: 'response-message',
            component: import('./response-message/response-message'),
            title: 'Response Messages',
        },
        {
            path: 'response-message/create',
            component: import('./response-message/create-response-message/create-response-message'),
            title: 'Response Messages',
        },
        {
            path: 'response-message/:discordApplicationCommandId',
            component: import('./response-message/edit-response-message/edit-response-message'),
            title: 'Response Messages',
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
        this.eventAggregator.publish('guild-updated', params.guildId)
    }
}
