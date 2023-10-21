import { bindable, containerless, ICustomElementViewModel } from 'aurelia';

import './discord-embed-preview.scss';

@containerless()
export class DiscordEmbedPreview implements ICustomElementViewModel{
    @bindable embed;
}
