import {bindable, customElement, ICustomElementViewModel} from "aurelia";

import './discord-embed-preview.scss';
import template from "./discord-embed-preview.html";

@customElement({
    name: 'discord-embed-preview',
    template: template,
    containerless: true
})
export class DiscordEmbedPreview implements ICustomElementViewModel{
    @bindable embed;
}
