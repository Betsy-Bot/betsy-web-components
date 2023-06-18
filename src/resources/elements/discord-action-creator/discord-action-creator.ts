import { bindable, BindingMode } from "aurelia";

import { DiscordCommandAction, DiscordCommandActionType } from "../../../services/models/discord";

export class DiscordActionCreator {
    @bindable({ mode: BindingMode.twoWay }) action: DiscordCommandAction;
    @bindable({ mode: BindingMode.twoWay }) command;
    @bindable deleteFunction: () => void;
    @bindable single;
    @bindable forcedType: boolean;

    actions = [
        {
            label: 'Channel Message',
            description: 'Sends a response to a selected channel',
            value:  DiscordCommandActionType.MessageChannel
        },
        {
            label: 'Interaction Response (DEPRECATED)',
            description: 'Sends response to the command itself',
            value: DiscordCommandActionType.MessageResponse,
            disabled: true
        },
        {
            label: 'Open Form',
            description: 'Opens a form for a user to complete',
            value:  DiscordCommandActionType.OpenForm
        },
        {
            label: 'Send GET Request',
            description: 'Sends a GET request to the desired API',
            value:  DiscordCommandActionType.SendGetRequest
        },
        {
            label: 'Send POST Request',
            description: 'Sends a POST request to the desired API',
            value:  DiscordCommandActionType.SendPostRequest
        },
        {
            label: 'Send PUT Request',
            description: 'Sends a PUT request to the desired API',
            value:  DiscordCommandActionType.SendPutRequest
        },
        {
            label: 'Send PATCH Request',
            description: 'Sends a PATCH request to the desired API',
            value:  DiscordCommandActionType.SendPatchRequest
        },
        {
            label: 'Send DELETE Request',
            description: 'Sends a DELETE request to the desired API',
            value:  DiscordCommandActionType.SendDeleteRequest
        },

    ]

    deleteAction() {
        this.deleteFunction();
    }

    get requiresMessage() {
        switch (this.action.type) {
            case DiscordCommandActionType.MessageChannel:
            case DiscordCommandActionType.MessageResponse:
                return true;
            default:
                return false;
        }
    }

    get requiresFormBuilder() {
        switch (this.action.type) {
            case DiscordCommandActionType.OpenForm:
                return true;
            default:
                return false;
        }
    }

    get requiresRestBuilder() {
        switch (this.action.type) {
            case DiscordCommandActionType.SendGetRequest:
            case DiscordCommandActionType.SendPostRequest:
            case DiscordCommandActionType.SendPutRequest:
            case DiscordCommandActionType.SendDeleteRequest:
            case DiscordCommandActionType.SendPatchRequest:
                return true;
            default:
                return false;
        }
    }
}
