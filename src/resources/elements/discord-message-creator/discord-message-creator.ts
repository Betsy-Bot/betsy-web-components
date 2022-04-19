import {bindable} from 'aurelia-framework';
import {DiscordEmbed} from "../../../services/models/discord";

export class DiscordMessageCreator {
    @bindable message;
    @bindable single;
    @bindable allowComponents: boolean;
    @bindable tab = 'message';

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
}
