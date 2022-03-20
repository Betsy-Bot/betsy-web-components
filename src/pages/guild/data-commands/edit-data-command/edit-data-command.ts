import {EventAggregator} from "aurelia-event-aggregator";
import {DiscordService} from "services/discord-service";
import {Router} from "aurelia-router";
import {toast} from "lets-toast";
import {inject} from "aurelia-framework";

@inject(EventAggregator, DiscordService, Router)
export class EditDataCommand {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }

}
