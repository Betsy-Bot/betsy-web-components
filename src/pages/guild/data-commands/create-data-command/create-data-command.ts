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

    activate(params) {
        this.guildId = params.guildId;
    }

    guildId: string;
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
                    content: 'Thank you for your submission!',
                    embeds: null
                }
            }
        }]
    };

    async create() {
        try {
            this.command.discordGuildId = this.guildId;
            await this.discordService.createApplicationCommand(this.command);
            toast("Data Command Created!");
            this.router.navigate(`/guild/${this.guildId}/data-commands`);
        } catch(e) {
            console.log(e);
            toast('Failed to create data command', {severity: 'error'})
        }
    }
}
