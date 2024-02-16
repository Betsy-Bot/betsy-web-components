import './moo-drawer.scss';

import { MDCDrawer } from '@material/drawer';
import {bindable, customElement, ICustomElementViewModel} from "@aurelia/runtime-html";

import template from './moo-drawer.html?raw';
@customElement({name:'moo-drawer', template, containerless: true})
export class MooDrawer implements ICustomElementViewModel {
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
