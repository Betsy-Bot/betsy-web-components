import './moo-menu.scss';

import { MDCMenu } from '@material/menu';
import {bindable, customElement, ICustomElementViewModel} from "@aurelia/runtime-html";

import template from './moo-menu.html?raw';
@customElement({name:'moo-menu', template, containerless: true})
export class MooMenu implements ICustomElementViewModel {
    @bindable open = false;
    menuEl: HTMLElement;
    menu: MDCMenu;

    attached() {
        this.menu = new MDCMenu(this.menuEl);
        this.menu.open = this.open;
    }

    openChanged() {
        if (this.menu) {
            this.menu.open = this.open;
        }
    }
}
