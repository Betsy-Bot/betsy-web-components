import {EventAggregator} from "aurelia-event-aggregator";
import {DiscordService} from "services/discord-service";
import {Router} from "aurelia-router";
import {toast} from "lets-toast";
import {inject} from "aurelia-framework";
import { BaseDiscordCommand, DiscordCommandActionType, DiscordCommandType } from "../../../../services/models/discord";

@inject(EventAggregator, DiscordService, Router)
export class EditDataCommand {
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
                    content: 'Thank you for your submission!',
                    embeds: null
                }
            }
        }]
    };
    guildId;
    discordApplicationCommandId;
    isNew = false;

    async activate(params) {
        this.guildId = params.guildId;
        this.discordApplicationCommandId = params.discordApplicationCommandId;
    }

    async attached() {
        if (!this.discordApplicationCommandId || this.discordApplicationCommandId == 0) {
            this.isNew = true;
        } else {
            this.command = await this.discordService.getDiscordCommandDetails(this.discordApplicationCommandId)
        }
    }

    async save() {
        try {
            if (this.isNew) {
                this.command.discordGuildId = this.guildId;
                await this.discordService.createApplicationCommand(this.command);
                toast("Data Command Created!", {severity: "success"});
            } else {
                this.command.discordGuildId = this.guildId;
                await this.discordService.updateApplicationCommand(this.command);
                toast("Data Command Updated!", {severity: "success"});
            }
        } catch(e) {
            console.log(e);
            toast('Failed to create data command', {severity: 'error'})
        }
    }
}
