import {bindable} from "aurelia";
import {DiscordCommandAction} from "../../../services/models/discord";

export class DiscordActionCreator {
    @bindable action: DiscordCommandAction;
    actions = [
        {
            label: 'Interaction Response',
            description: 'Sends response to the command itself',
            value: 1
        },
        {
            label: 'Channel Message',
            description: 'Sends a response to a selected channel ID',
            value: 2
        }
    ]

}