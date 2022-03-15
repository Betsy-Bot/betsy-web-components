import {bindable} from "aurelia-framework";
import * as showdown from 'showdown';
import sanitizeHtml from 'sanitize-html';

import './discord-embed-preview.scss';

export class DiscordEmbedPreview {
    @bindable embed;

    getMarkup(content) {
        const converter = new showdown.Converter({ strikethrough: true });
        content.replace(/(\r\n|\r|\n)/g, '<br>');
        let html = converter.makeHtml(content);
        return sanitizeHtml(html);
    }
}
