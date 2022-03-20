import {bindable} from "aurelia-framework";
import {DiscordCommandAction, DiscordCommandActionType} from "../../../services/models/discord";

export class DiscordActionCreator {
    @bindable action: DiscordCommandAction;
    @bindable deleteFunction;

    actions = [
        {
            label: 'Interaction Response',
            description: 'Sends response to the command itself',
            value: DiscordCommandActionType.MessageResponse
        },
        {
            label: 'Channel Message',
            description: 'Sends a response to a selected channel',
            value:  DiscordCommandActionType.MessageChannel
        }
    ]

    deleteAction() {
        this.deleteFunction({action: this.action});
    }

}
