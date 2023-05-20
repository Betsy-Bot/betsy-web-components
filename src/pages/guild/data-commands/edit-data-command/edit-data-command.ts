import { IEventAggregator } from "aurelia";
import { DiscordService } from "../../../../services/discord-service";
import { IRouteViewModel, route, IRouter } from "@aurelia/router-lite";
import { toast } from "lets-toast";
import { bindable, inject } from "aurelia";
import {
    BaseDiscordCommand,
    DiscordCommandActionType,
    DiscordCommandType,
} from "../../../../services/models/discord";

@route({
    path: "data-commands/:commandId",
    title: "Manage Data Command",
})
@inject(IEventAggregator, DiscordService, IRouter)
export class EditDataCommand implements IRouteViewModel {
    constructor(
        private eventAggregator: IEventAggregator,
        private discordService: DiscordService,
        private router: IRouter
    ) {}
    command;
    commandTemplate: BaseDiscordCommand = {
        name: "",
        description: "",
        discordGuildId: null,
        type: DiscordCommandType.Data,
        private: false,
        active: true,
        discordCommandActions: [
            {
                type: DiscordCommandActionType.OpenForm,
                discordMessage: {
                    message: {
                        content: "Request Handled!",
                        embeds: null,
                    },
                },
            },
        ],
    };
    @bindable tab = "form";
    guildId;
    discordApplicationCommandId;
    isNew = false;
    restTypes = [
        DiscordCommandActionType.SendPostRequest,
        DiscordCommandActionType.SendPutRequest,
        DiscordCommandActionType.SendPatchRequest,
        DiscordCommandActionType.SendGetRequest,
        DiscordCommandActionType.SendDeleteRequest,
    ];

    async loading(params) {
        this.discordApplicationCommandId = params.commandId;
    }

    async attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
        if (
            !this.discordApplicationCommandId ||
            this.discordApplicationCommandId == 0
        ) {
            this.isNew = true;
            this.command = this.commandTemplate;
        } else {
            this.command = await this.discordService.getDiscordCommandDetails(
                this.discordApplicationCommandId
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
                await this.discordService.createApplicationCommand(
                    this.command
                );
                toast("Data Command Created!", { severity: "success" });
                await this.router.load("../data-commands", { context: this });
            } else {
                console.log(this.command);
                this.command.discordGuildId = this.guildId;
                await this.discordService.updateApplicationCommand(
                    this.command
                );
                toast("Data Command Updated!", { severity: "success" });
            }
        } catch (e) {
            console.log(e);
            toast("Failed to create data command", { severity: "error" });
        }
    }

    tabChanged() {
        switch (this.tab) {
            case "rest":
                if (
                    this.command.discordCommandActions[0].type ==
                    DiscordCommandActionType.OpenForm
                ) {
                    return (this.command.discordCommandActions[0].type =
                        DiscordCommandActionType.SendPostRequest);
                }
                break;
            case "form":
                if (!this.command.discordCommandActions[0].type) {
                    return (this.command.discordCommandActions[0].type =
                        DiscordCommandActionType.OpenForm);
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
        if (
            !this.command.discordCommandActions[0].restRequestMetadata
                .requestHeaders
        ) {
            this.command.discordCommandActions[0].restRequestMetadata.requestHeaders =
                [];
        }
        this.command.discordCommandActions[0].restRequestMetadata.requestHeaders.push(
            {}
        );
    }

    removeHeader(index) {
        this.command.discordCommandActions[0].restRequestMetadata.requestHeaders.splice(
            index,
            1
        );
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
        if (!this.command.discordCommandActions[0].restRequestMetadata) {
            this.command.discordCommandActions[0].restRequestMetadata = {};
        }
        if (
            !this.command.discordCommandActions[0].restRequestMetadata
                .defaultRequestData
        ) {
            this.command.discordCommandActions[0].restRequestMetadata.defaultRequestData =
                [];
        }
        this.command.discordCommandActions[0].restRequestMetadata.defaultRequestData.push(
            {}
        );
    }

    removeDefaultData(index) {
        this.command.discordCommandActions[0].restRequestMetadata.defaultRequestData.splice(
            index,
            1
        );
    }

    addResponseMapping() {
        if (!this.command.discordCommandActions[0].restRequestMetadata) {
            this.command.discordCommandActions[0].restRequestMetadata = {};
        }
        if (
            !this.command.discordCommandActions[0].restRequestMetadata
                .requestResponseMappings
        ) {
            this.command.discordCommandActions[0].restRequestMetadata.requestResponseMappings =
                [];
        }
        this.command.discordCommandActions[0].restRequestMetadata.requestResponseMappings.push(
            {}
        );
    }

    removeResponseMapping(index) {
        this.command.discordCommandActions[0].restRequestMetadata.requestResponseMappings.splice(
            index,
            1
        );
    }
}
