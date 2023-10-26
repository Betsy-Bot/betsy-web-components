import './moo-topbar.scss';

import { MDCTopAppBar } from '@material/top-app-bar';
import {containerless, ICustomElementViewModel} from "@aurelia/runtime-html";

@containerless()
export class MooTopbar implements ICustomElementViewModel {
    header: HTMLElement;
    attached() {
        new MDCTopAppBar(this.header);
    }
}
