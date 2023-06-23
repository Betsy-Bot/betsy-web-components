import {
    bindable,
    BindingMode,
    containerless,
    ICustomElementViewModel,
    inject,
} from "aurelia";
import { watch } from "@aurelia/runtime-html";

import { DiscordService } from "../../../services/discord-service";
import {
    DiscordEmbed,
    IDiscordMessageContent,
} from "../../../services/models/discord";

import "./discord-message-creator.scss";

import { MDCDialog, MDCDialogCloseEvent } from "@material/dialog";

@containerless()
@inject(DiscordService)
export class DiscordMessageCreator implements ICustomElementViewModel {
    @bindable({ mode: BindingMode.twoWay }) message: IDiscordMessageContent | null = {};
    @bindable single;
    @bindable allowComponents = true;
    @bindable maxComponents = 5;
    @bindable tab = "embeds";
    selectedMessage: string | null;
    @bindable hideTemplate = false;
    @bindable customBuilder;
    jsonDialog: MDCDialog;
    json: string;

    constructor(private discordService: DiscordService) {}

    binding() {
        if (!this.message) {
            this.message = {};
        }
    }

    @watch("selectedMessage")
    selectedMessageChanged() {
        if (this.selectedMessage) {
            const foundMessage = this.discordService.getMessageResourceById(
                this.selectedMessage
            );
            if (foundMessage) {
                this.message = foundMessage.message;
            }
            this.selectedMessage = null;
        }
    }

    addEmbed() {
        if (!this.message?.embeds) {
            this.message.embeds = [];
        }
        this.message?.embeds.push(new DiscordEmbed());
    }

    deleteEmbed(index: number) {
        this.message?.embeds?.splice(index, 1);
    }

    get canCreateEmbed() {
        if (!this.message?.embeds) return true;
        if (!this.single) {
            return !this.message.embeds || this.message.embeds.length < 10;
        } else {
            return !this.message.embeds || this.message.embeds.length < 1;
        }
    }

    importJson(event: MDCDialogCloseEvent) {
        if (event.detail.action == "ok") {
            this.message = JSON.parse(this.json) as IDiscordMessageContent;
            this.json = "";
        }
    }

    openDialog() {
        this.json = JSON.stringify(this.message, null, 4);
        this.jsonDialog.open();
    }
}
