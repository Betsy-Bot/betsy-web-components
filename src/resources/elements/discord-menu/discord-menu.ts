import {bindable, customElement} from "aurelia";
import './discord-menu.scss';
import template from "./discord-menu.html";
@customElement({
    name: 'discord-menu',
    template: template,
    containerless: true
})
export class DiscordMenu {
    @bindable menu;
}
