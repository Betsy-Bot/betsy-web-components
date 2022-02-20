import {inject, IRouteViewModel, Params, RouteNode, IEventAggregator} from "aurelia";

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