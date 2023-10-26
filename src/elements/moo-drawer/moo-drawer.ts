import './moo-drawer.scss';

import { MDCDrawer } from '@material/drawer';
import {bindable, ICustomElementViewModel} from "@aurelia/runtime-html";

export class MooDrawer implements ICustomElementViewModel {
    static containerless = true;
    @bindable open: boolean;
    drawerEl: HTMLElement;
    drawer: MDCDrawer;
    didAttach = false;
    attached() {
        if (!this.didAttach) {
            this.drawer = MDCDrawer.attachTo(this.drawerEl);
            this.drawer.open = this.open;
            this.didAttach = true;
        }
    }

    openChanged() {
        this.drawer.open = this.open;
    }
}
