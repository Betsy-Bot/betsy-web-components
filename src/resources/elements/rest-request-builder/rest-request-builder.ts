import {
    bindable,
    BindingMode,
    containerless,
    ICustomElementViewModel,
} from 'aurelia';

import {
    DiscordCommandActionType,
    IDiscordCommandAction,
} from '../../../services/models/discord';

@containerless()
export class RestRequestBuilder implements ICustomElementViewModel {
    @bindable({ mode: BindingMode.twoWay }) action: IDiscordCommandAction;
    @bindable({ mode: BindingMode.twoWay }) command;

    getDisplayTextForCommandActionType(type: DiscordCommandActionType) {
        switch (type) {
            case DiscordCommandActionType.SendPatchRequest:
                return 'PATCH';
            case DiscordCommandActionType.SendPutRequest:
                return 'PUT';
            case DiscordCommandActionType.SendPostRequest:
                return 'POST';
            case DiscordCommandActionType.SendGetRequest:
                return 'GET';
            case DiscordCommandActionType.SendDeleteRequest:
                return 'DELETE';
        }
    }

    addHeader() {
        if (!this.action.restRequestMetadata) {
            this.action.restRequestMetadata = {};
        }
        if (!this.action.restRequestMetadata.requestHeaders) {
            this.action.restRequestMetadata.requestHeaders = [];
        }
        this.action.restRequestMetadata.requestHeaders.push({});
    }

    removeHeader(index) {
        this.action.restRequestMetadata.requestHeaders.splice(index, 1);
    }

    addParameter() {
        if (!this.command.commandInformation) {
            this.command.commandInformation = {};
        }
        if (!this.command.commandInformation.options) {
            this.command.commandInformation.options = [];
        }
        this.command.commandInformation.options.push({ required: true });
    }

    removeParameter(index) {
        this.command.commandInformation.options.splice(index, 1);
    }

    addDefaultData() {
        if (!this.action.restRequestMetadata) {
            this.action.restRequestMetadata = {};
        }
        if (!this.action.restRequestMetadata.defaultRequestData) {
            this.action.restRequestMetadata.defaultRequestData = [];
        }
        this.action.restRequestMetadata.defaultRequestData.push({});
    }

    removeDefaultData(index) {
        this.action.restRequestMetadata.defaultRequestData.splice(index, 1);
    }

    addResponseMapping() {
        if (!this.action.restRequestMetadata) {
            this.action.restRequestMetadata = {};
        }
        if (!this.action.restRequestMetadata.requestResponseMappings) {
            this.action.restRequestMetadata.requestResponseMappings = [];
        }
        this.action.restRequestMetadata.requestResponseMappings.push({});
    }

    removeResponseMapping(index) {
        this.action.restRequestMetadata.requestResponseMappings.splice(
            index,
            1
        );
    }
}
