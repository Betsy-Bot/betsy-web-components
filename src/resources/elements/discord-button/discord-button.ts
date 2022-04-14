import {bindable} from "aurelia-framework";
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
        }
    }

    attached() {
        console.log(this.button);
    }
}
