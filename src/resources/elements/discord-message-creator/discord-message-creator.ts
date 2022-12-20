import { bindable, inject } from 'aurelia-framework';
import {DiscordEmbed} from "../../../services/models/discord";

export class DiscordMessageCreator {
    @bindable message = {
        embeds: [],
        components: []
    };
    @bindable single;
    @bindable allowComponents: boolean;
    @bindable maxComponents: number = 5;
    @bindable tab = 'message';
    @bindable selectedMessage;
    @bindable hideTemplate: boolean = false
    @bindable customBuilder;

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
            return !this.message.embeds || this.message.embeds.length < 10
        } else {
            return !this.message?.embeds || this.message?.embeds?.length < 1
        }
    }
}
