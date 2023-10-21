import { bindable, containerless, ICustomElementViewModel } from 'aurelia';

import './moo-drawer.scss';

import { MDCDrawer } from '@material/drawer';

@containerless()
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
