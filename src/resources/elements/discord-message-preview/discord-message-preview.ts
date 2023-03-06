import { bindable } from "aurelia-framework";
import './discord-message-preview.scss';

export class DiscordMessagePreview {
    @bindable message;
    @bindable first = true;

    get currentTime() {
        return new Intl.DateTimeFormat('en', { dateStyle: 'long', timeStyle: 'short' }).format(new Date());
    }
}
