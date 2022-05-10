import {bindable, inject} from "aurelia-framework";
import moment from 'moment';

export class DiscordMessagesRenderer {
    @bindable messages;

    attached() {
        this.messages?.reverse();
    }

    showAuthor(message, index) {
        if (!index) {
            return true;
        }
        if (this.messages[index - 1].discordUserName != message.discordUserName) {
            return true;
        }
        const diff = moment(message.createdDate).diff(this.messages[index - 1].createdDate, 'minutes');
        console.log(diff);
        return false;
    }
}
