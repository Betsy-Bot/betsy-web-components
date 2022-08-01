import {inject, bindable} from "aurelia-framework";
import {DiscordService} from "../../../services/discord-service";
import { ValidationControllerFactory, ValidationRules, ValidationController, Rule } from 'aurelia-validation';

@inject(DiscordService, ValidationControllerFactory)
export class DiscordChannelSelector {
    constructor(private discordService: DiscordService, private validationControllerFactory: ValidationControllerFactory) {
        this.validationController = this.validationControllerFactory.createForCurrentScope();
        this.rules = ValidationRules
            .ensure('channelId').required().withMessage('Required').then()
            .rules;
    }

    @bindable guildId: string;
    @bindable channelId: string;
    @bindable type: number;
    @bindable label;
    @bindable required: boolean = false;
    @bindable class;
    @bindable includeNull;
    validationController: ValidationController;
    rules: Rule<DiscordChannelSelector, unknown>[][];

    channels;

    async created() {
        if (!this.guildId) {
            this.guildId = this.discordService.getLocalDiscordGuildId();
        }
    }

    async attached() {
        this.channels = await this.discordService.getDiscordChannels(this.guildId);
        if (this.required) {
            this.validationController.addObject(this, this.rules);
        }
    }

    matchesType(channel) {
        return this.type != null ? channel.type === this.type : true;
    }
}
