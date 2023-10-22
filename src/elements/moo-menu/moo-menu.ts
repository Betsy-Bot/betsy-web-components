import {
    bindable, containerless,
    ICustomElementViewModel,
} from 'aurelia';

import './moo-menu.scss';

import { MDCMenu } from '@material/menu';

@containerless()
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
