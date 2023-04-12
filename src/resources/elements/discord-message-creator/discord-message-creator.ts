import {bindable, BindingMode, customElement, ICustomElementViewModel, inject} from 'aurelia';
import { DiscordEmbed } from "../../../services/models/discord";
import './discord-message-creator.scss';
import template from "./discord-message-creator.html";

@customElement({
    name: 'discord-message-creator',
    template: template,
    containerless: true
})
export class DiscordMessageCreator implements ICustomElementViewModel{
    @bindable({mode: BindingMode.twoWay}) message = {
        embeds: [],
        components: []
    };
    @bindable single;
    @bindable allowComponents = true;
    @bindable maxComponents = 5;
    @bindable tab = 'embeds';
    @bindable selectedMessage;
    @bindable hideTemplate = false
    @bindable customBuilder;
    jsonDialog;
    json: string;

    selectedMessageChanged() {
        if (this.selectedMessage?.message) {
            this.message = this.selectedMessage.message;
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
            return !this.message?.embeds || this.message?.embeds?.length < 10
        } else {
            return !this.message?.embeds || this.message?.embeds?.length < 1
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
