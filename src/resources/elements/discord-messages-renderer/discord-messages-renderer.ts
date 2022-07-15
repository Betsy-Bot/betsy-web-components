import {bindable, inject} from "aurelia-framework";
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
        let dt1 = new Date(message.createdDate);
        let dt2 = new Date(this.messages[index - 1].createdDate);
        let timeDifference  =(dt2.getTime() - dt1.getTime()) / 1000;
        timeDifference /= 60;
        let diff = Math.abs(Math.round(timeDifference));
        return false;
    }
}
