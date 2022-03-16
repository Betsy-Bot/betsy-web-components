import * as showdown from 'showdown';
import sanitizeHtml from 'sanitize-html';

export class DiscordMarkupValueConverter {
    toView(value, page) {
        const converter = new showdown.Converter({ strikethrough: true });
        value = value.replace(/(\r\n|\r|\n|\\n)/g, '<br>');
        let html = converter.makeHtml(value);
        return sanitizeHtml(html);
    }
}
