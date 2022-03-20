import {EventAggregator} from "aurelia-event-aggregator";
import {DiscordService} from "services/discord-service";
import {Router} from "aurelia-router";
import {toast} from "lets-toast";
import {inject} from "aurelia-framework";
import {BaseDiscordCommand} from "../../../../services/models/discord";

@inject(EventAggregator, DiscordService, Router)
export class EditDataCommand {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }

    command: BaseDiscordCommand;
    guildId;
    discordApplicationCommandId;

    async activate(params) {
        this.guildId = params.guildId;
        this.discordApplicationCommandId = params.discordApplicationCommandId;
        this.command = await this.discordService.getDiscordCommandDetails(this.discordApplicationCommandId)
    }

    async save() {
        try {
            this.command.discordGuildId = this.guildId;
            await this.discordService.updateApplicationCommand(this.command);
            toast("Data Command Updated!");
        } catch(e) {
            console.log(e);
            toast('Failed to create data command', {severity: 'error'})
        }
    }
}
