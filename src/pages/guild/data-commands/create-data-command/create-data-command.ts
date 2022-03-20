import {EventAggregator} from "aurelia-event-aggregator";
import {DiscordService} from "services/discord-service";
import {Router} from "aurelia-router";
import {toast} from "lets-toast";
import {inject} from "aurelia-framework";
import {BaseDiscordCommand, DiscordCommandActionType, DiscordCommandType} from "../../../../services/models/discord";

@inject(EventAggregator, DiscordService, Router)
export class CreateDataCommand {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }

    command: BaseDiscordCommand = {
        name: null,
        description : null,
        discordGuildId: null,
        type: DiscordCommandType.Data,
        private: true,
        discordCommandActions: [{
            type: DiscordCommandActionType.OpenForm,
            discordMessage: {
                message: {
                    content: 'Some Content',
                    embeds: null
                }
            }
        }]
    };
}
