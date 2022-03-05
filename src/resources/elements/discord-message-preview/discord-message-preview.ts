import {bindable} from "aurelia";
import * as moment from 'moment';
import * as showdown from 'showdown';
import sanitizeHtml from 'sanitize-html';

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
        html += '<script>console.log("injection")</script>' //Keep this in here and look for this in the output. Should be sanitized out.
        return sanitizeHtml(html);
    }
}