import {bindable} from "aurelia";
import * as moment from 'moment';
import * as showdown from 'showdown';

export class DiscordMessagePreview {
    @bindable message;
    @bindable first;

    get currentTime() {
        // @ts-ignore - No idea why TS is bitching but this works fine.
        return moment().calendar();
    }

    getMarkup(content) {
        const converter = new showdown.Converter({strikethrough: true});
        console.log('converted' , converter.makeHtml(content));
        let html = converter.makeHtml(content);
        //placeholder for additional conversion needed
        return html;
    }
}