import {bindable} from "aurelia-framework";
import * as moment from 'moment';
import * as showdown from 'showdown';
import sanitizeHtml from 'sanitize-html';

export class DiscordMessagePreview {
    @bindable message;
    @bindable first = true;

    get currentTime() {
        // @ts-ignore - No idea why TS is bitching but this works fine.
        return moment().calendar();
    }

    getMarkup(content) {
        const converter = new showdown.Converter({ strikethrough: true });
        content.replace(/(\r\n|\r|\n)/g, '<br>');
        let html = converter.makeHtml(content);
        html += '<script>console.log("injection")</script>' //Keep this in here and look for this in the output. Should be sanitized out.
        return sanitizeHtml(html);
    }
}
