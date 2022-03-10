import {bindable} from 'aurelia-framework';
import {DiscordEmbed} from "../../../services/models/discord";

export class DiscordMessageCreator {
    @bindable message;

    attached() {
        if (this.message.embeds?.length > 0) {
            this.message.type = "embeds"
        } else {
            this.message.type = "message";
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

    selectTab(tab) {
        this.message.type = tab;
    }
}
