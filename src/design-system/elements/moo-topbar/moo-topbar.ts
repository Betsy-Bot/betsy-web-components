import {bindable, customElement, ICustomElementViewModel} from 'aurelia';
import {MDCTopAppBar} from '@material/top-app-bar';
import template from './moo-topbar.html';
import './moo-topbar.scss';

@customElement({
    name: 'moo-topbar',
    template,
    containerless: true
})
export class MooTopbar implements ICustomElementViewModel {
    header: HTMLElement;
    attached() {
        new MDCTopAppBar(this.header);
    }
}
