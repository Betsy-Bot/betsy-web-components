import './moo-topbar.scss';

import { MDCTopAppBar } from '@material/top-app-bar';
import { ICustomElementViewModel } from "@aurelia/runtime-html";

export class MooTopbar implements ICustomElementViewModel {
    static containerless = true;
    header: HTMLElement;
    attached() {
        new MDCTopAppBar(this.header);
    }
}
