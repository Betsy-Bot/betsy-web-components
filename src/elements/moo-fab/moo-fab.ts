import './moo-fab.scss';

import { MDCRipple } from '@material/ripple';
import {bindable, ICustomElementViewModel} from "@aurelia/runtime-html";

export class MooFab implements ICustomElementViewModel {
    static containerless = true;
    @bindable icon: string;
    @bindable label: string;
    @bindable class: string;
    @bindable click;
    @bindable external: boolean;
    @bindable url: string;
    @bindable route: string;
    fabEl: HTMLElement;

    attached() {
        new MDCRipple(this.fabEl);
    }

    handleClick() {
        if (this.click) {
            this.click();
        }
    }

    get extendedClass() {
        if (this.label) {
            return 'mdc-fab--extended'
        }
        return 'mdc-fab--mini'
    }
}
