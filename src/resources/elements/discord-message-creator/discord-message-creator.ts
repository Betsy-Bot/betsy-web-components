import { bindable, BindingMode, containerless, ICustomElementViewModel, inject } from 'aurelia';
import { watch } from "@aurelia/runtime-html";

import { DiscordService } from "../../../services/discord-service";
import { DiscordEmbed } from "../../../services/models/discord";

import './discord-message-creator.scss';

@containerless()
@inject(DiscordService)
export class DiscordMessageCreator implements ICustomElementViewModel{
    @bindable({ mode: BindingMode.twoWay }) message = {
        embeds: [],
        components: []
    };
    @bindable single;
    @bindable allowComponents = true;
    @bindable maxComponents = 5;
    @bindable tab = 'embeds';
    selectedMessage;
    @bindable hideTemplate = false;
    @bindable customBuilder;
    jsonDialog;
    json: string;

    constructor(private discordService: DiscordService) {
    }

    @watch('selectedMessage')
    selectedMessageChanged() {
        if (this.selectedMessage) {
            console.log(this.message);
            const foundMessage = this.discordService.getMessageResourceById(this.selectedMessage);
            if (foundMessage) {
                this.message = foundMessage.message;
            }
            console.log(this.message);
            this.selectedMessage = null;
        }
    }

    addEmbed() {
        if (!this.message.embeds) {
            this.message.embeds = [];
        }
        this.message.embeds.push(new DiscordEmbed())
    }

    deleteEmbed(index) {
        this.message.embeds.splice(index, 1)
    }

    get canCreateEmbed() {
        if (!this.single) {
            return !this.message.embeds || this.message.embeds.length < 10
        } else {
            return !this.message.embeds || this.message.embeds.length < 1
        }
    }

    importJson(event) {
        console.log(event);
        if (event.detail.action == 'ok') {
            this.message = JSON.parse(this.json);
            this.json = "";
        }
    }

    openDialog() {
        this.json = JSON.stringify(this.message, null, 4);
        this.jsonDialog.open()
    }
}
