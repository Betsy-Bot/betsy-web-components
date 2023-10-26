import './moo-menu.scss';

import { MDCMenu } from '@material/menu';
import {bindable, containerless, ICustomElementViewModel} from "@aurelia/runtime-html";

export class MooMenu implements ICustomElementViewModel {
    static containerless = true;
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
