import { containerless, ICustomElementViewModel } from 'aurelia';

import './moo-topbar.scss';

import { MDCTopAppBar } from '@material/top-app-bar';

@containerless()
export class MooTopbar implements ICustomElementViewModel {
    header: HTMLElement;
    attached() {
        new MDCTopAppBar(this.header);
    }
}
