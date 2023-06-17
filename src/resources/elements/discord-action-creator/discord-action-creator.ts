import { bindable } from "aurelia";

import { DiscordCommandAction, DiscordCommandActionType } from "../../../services/models/discord";

export class DiscordActionCreator {
    @bindable action: DiscordCommandAction;
    @bindable deleteFunction;
    @bindable single;
    @bindable forcedType: boolean;

    actions = [
        {
            label: 'Interaction Response (DEPRECATED)',
            description: 'Sends response to the command itself',
            value: DiscordCommandActionType.MessageResponse,
            disabled: true
        },
        {
            label: 'Channel Message',
            description: 'Sends a response to a selected channel',
            value:  DiscordCommandActionType.MessageChannel,
            disabled: false
        }
    ]

    deleteAction() {
        this.deleteFunction();
    }
}
