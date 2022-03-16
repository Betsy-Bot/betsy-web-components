import {bindable} from "aurelia-framework";
import * as moment from 'moment';
import './discord-message-preview.scss';

export class DiscordMessagePreview {
    @bindable message;
    @bindable first = true;

    get currentTime() {
        // @ts-ignore - No idea why TS is bitching but this works fine.
        return moment().calendar();
    }
}
