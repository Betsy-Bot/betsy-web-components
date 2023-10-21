import { bindable } from 'aurelia';

import { DiscordApplicationCommandOptionType } from '../../../services/models/discord';

export class DiscordCommandParameterCreator {
    @bindable parameter;
    @bindable hideDescription;
    @bindable hideSwitch;
    @bindable showValue;

    optionTypes: DiscordApplicationCommandOptionType[] = [
        DiscordApplicationCommandOptionType.String,
        DiscordApplicationCommandOptionType.Boolean,
        DiscordApplicationCommandOptionType.Integer,
        DiscordApplicationCommandOptionType.Number
    ]

    getOptionName(option: DiscordApplicationCommandOptionType) {
        switch(option) {
            case DiscordApplicationCommandOptionType.String:
                return 'String'
            case DiscordApplicationCommandOptionType.Boolean:
                return 'Boolean'
            case DiscordApplicationCommandOptionType.Integer:
                return 'Integer'
            case DiscordApplicationCommandOptionType.Number:
                return 'Number'
        }
    }
}
