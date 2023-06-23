import { IEventAggregator, inject } from "aurelia";
import { IRouter, IRouteViewModel, Params, route } from "@aurelia/router-lite";

import { DiscordService } from "../../../../services/discord-service";
import { DiscordCommandActionType, DiscordCommandType,IBaseDiscordCommand } from "../../../../services/models/discord";

import { toast } from "lets-toast";

@route({
    path: "custom-commands/:commandId",
    title: "Manage Custom Command",
})
@inject(IEventAggregator, DiscordService, IRouter)
export class ManageCustomCommand implements IRouteViewModel {
    constructor(
        private eventAggregator: IEventAggregator,
        private discordService: DiscordService,
        private router: IRouter
    ) {}

    command: IBaseDiscordCommand;
    tab = "settings";
    commandTemplate: IBaseDiscordCommand = {
        name: "",
        description: "",
        discordGuildId: "",
        type: DiscordCommandType.Data,
        private: true,
        active: true,
        discordCommandActions: [],
    };
    guildId: string;
    discordApplicationCommandId: string | number | undefined;
    isNew = false;
    selectedAction = 0;

    loading(params: Params) {
        this.discordApplicationCommandId = params.commandId;
    }

    async attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
        if (!this.discordApplicationCommandId || this.discordApplicationCommandId == 0) {
            this.isNew = true;
            this.command = this.commandTemplate;
        } else {
            this.command = await this.discordService.getDiscordCommandDetails(
                this.discordApplicationCommandId as string
            );
            if (this.command.commandInformation) {
                this.tab = "rest";
            }
        }
    }

    async save() {
        try {
            if (this.isNew) {
                this.command.discordGuildId = this.guildId;
                await this.discordService.createApplicationCommand(this.command);
                await this.router.load("../custom-commands", { context: this });
            } else {
                this.command.discordGuildId = this.guildId;
                await this.discordService.updateApplicationCommand(this.command);
            }toast(`Custom Command ${this.isNew ? 'Created' : 'Updated'}!`, { severity: "success" });
        } catch (e) {
            console.log(e);
            toast("Failed to create custom command", { severity: "error" });
        }
    }

    tabChanged() {
        switch (this.tab) {
            case "rest":
                if (this.command.discordCommandActions[0].type == DiscordCommandActionType.OpenForm) {
                    return (this.command.discordCommandActions[0].type = DiscordCommandActionType.SendPostRequest);
                }
                break;
            case "form":
                if (!this.command.discordCommandActions[0].type) {
                    return (this.command.discordCommandActions[0].type = DiscordCommandActionType.OpenForm);
                }
                break;
        }
    }

    getDisplayTextForCommandActionType(type: DiscordCommandActionType) {
        switch (type) {
            case DiscordCommandActionType.SendPatchRequest:
                return "PATCH";
            case DiscordCommandActionType.SendPutRequest:
                return "PUT";
            case DiscordCommandActionType.SendPostRequest:
                return "POST";
            case DiscordCommandActionType.SendGetRequest:
                return "GET";
            case DiscordCommandActionType.SendDeleteRequest:
                return "DELETE";
        }
    }

    addHeader() {
        if (!this.command.discordCommandActions[0].restRequestMetadata) {
            this.command.discordCommandActions[0].restRequestMetadata = {};
        }
        if (!this.command.discordCommandActions[0].restRequestMetadata.requestHeaders) {
            this.command.discordCommandActions[0].restRequestMetadata.requestHeaders = [];
        }
        this.command.discordCommandActions[0].restRequestMetadata.requestHeaders.push({});
    }

    removeHeader(index) {
        this.command.discordCommandActions[0].restRequestMetadata.requestHeaders.splice(index, 1);
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

    removeParameter(index: number) {
        this.command.commandInformation?.options.splice(index, 1);
    }

    addDefaultData() {
        if (!this.command.discordCommandActions[0].restRequestMetadata) {
            this.command.discordCommandActions[0].restRequestMetadata = {};
        }
        if (!this.command.discordCommandActions[0].restRequestMetadata.defaultRequestData) {
            this.command.discordCommandActions[0].restRequestMetadata.defaultRequestData = [];
        }
        this.command.discordCommandActions[0].restRequestMetadata.defaultRequestData.push({});
    }

    removeDefaultData(index: number) {
        this.command.discordCommandActions[0].restRequestMetadata.defaultRequestData.splice(index, 1);
    }

    addResponseMapping() {
        if (!this.command.discordCommandActions[0].restRequestMetadata) {
            this.command.discordCommandActions[0].restRequestMetadata = {};
        }
        if (!this.command.discordCommandActions[0].restRequestMetadata.requestResponseMappings) {
            this.command.discordCommandActions[0].restRequestMetadata.requestResponseMappings = [];
        }
        this.command.discordCommandActions[0].restRequestMetadata.requestResponseMappings.push({});
    }

    removeResponseMapping(index: number) {
        this.command.discordCommandActions[0].restRequestMetadata.requestResponseMappings.splice(index, 1);
    }

    deleteAction(index: number) {
        this.command.discordCommandActions.splice(index, 1);
    }

    createNewCommandAction() {
        this.command.discordCommandActions.push({
            type: DiscordCommandActionType.MessageChannel,
            discordMessage: {
                message: {
                    content: "",
                    embeds: [],
                },
            },
        });
    }

    get previewMessage() {
        return this.command.responseMessage ?? this.responseMessage;
    }

    get responseMessage() {
        if (this.command.discordCommandActions) {
            const found = this.command.discordCommandActions.find(
                (x) => x.type == DiscordCommandActionType.MessageResponse
            );
            return found?.discordMessage;
        }
    }
}
