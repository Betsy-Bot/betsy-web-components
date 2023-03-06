import { bindable, inject } from "aurelia-framework";
import './discord-messages-renderer.scss';
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
        const dt1 = new Date(message.createdDate);
        const dt2 = new Date(this.messages[index - 1].createdDate);
        let timeDifference =(dt2.getTime() - dt1.getTime()) / 1000;
        timeDifference /= 60;
        const diff = Math.abs(Math.round(timeDifference));
        //TODO Check diff and show author if message between longer than 30 minutes
        return false;
    }

    isImage(url: string) {
        const result = /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
        if (result) return true
        return url.includes('s3.amazonaws.com');
    }
}
