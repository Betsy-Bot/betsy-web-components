import { bindable } from "aurelia-framework";
import './discord-button.scss';

export class DiscordButton {
    @bindable button;
    getButtonClass(style) {
        switch (style) {
            case 1:
                return 'discord-button-primary'
            case 3:
                return 'discord-button-success'
            case 2:
                return 'discord-button-secondary'
            case 4:
                return 'discord-button-danger'
            case 5:
                return 'discord-button-link'
        }
    }

    get displayEmoji() {
        if (this.button.emoji.name) {
            return this.button.emoji.name
        }
        return null;
    }

    get isEmoji() {
        return /\p{Extended_Pictographic}/u.test(this.button.emoji.name); // true :)
    }
}
