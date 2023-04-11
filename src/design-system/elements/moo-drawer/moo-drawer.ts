import {bindable, customElement, ICustomElementViewModel} from 'aurelia';
import {MDCDrawer} from "@material/drawer";
import template from './moo-drawer.html';
import './moo-drawer.scss';

@customElement({
    name: 'moo-drawer',
    template,
    containerless: true
})
export class MooDrawer implements ICustomElementViewModel {
    @bindable open;
    drawerEl: HTMLElement;
    drawer;
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
