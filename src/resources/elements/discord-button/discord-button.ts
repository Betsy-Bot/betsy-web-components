import { bindable, containerless } from "aurelia";

import { DiscordComponent } from "../../../services/models/discord";

import "./discord-button.scss";

@containerless()
export class DiscordButton {
    @bindable button: DiscordComponent;

    get buttonClass() {
        switch (this.button.style) {
            case 1:
                return "discord-button-primary";
            case 3:
                return "discord-button-success";
            case 2:
                return "discord-button-secondary";
            case 4:
                return "discord-button-danger";
            case 5:
                return "discord-button-link";
        }
    }

    get displayEmoji() {
        if (this.button.emoji.name) {
            return this.button.emoji.name;
        }
        return null;
    }

    get isEmoji() {
        if (this.button.emoji?.name) {
            return /\p{Extended_Pictographic}/u.test(this.button.emoji.name);
        }
        return false;
    }
}
