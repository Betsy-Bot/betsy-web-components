import { bindable, containerless } from 'aurelia';

import './discord-menu.scss';
@containerless()
export class DiscordMenu {
    @bindable menu;
}
