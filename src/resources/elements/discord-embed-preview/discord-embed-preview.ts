import {bindable} from "aurelia-framework";
import * as showdown from 'showdown';
import sanitizeHtml from 'sanitize-html';

import './discord-embed-preview.scss';

export class DiscordEmbedPreview {
    @bindable embed;

    getMarkup(content) {
        const converter = new showdown.Converter({ strikethrough: true });
        content = content.replace(/(\r\n|\r|\n|\\n)/g, '<br>');
        let html = converter.makeHtml(content);
        return sanitizeHtml(html);
    }
}
