import {bindable, customElement, ICustomElementViewModel} from 'aurelia';
import {MDCRipple} from '@material/ripple';
import template from './moo-fab.html';
import './moo-fab.scss';

@customElement({
    name: 'moo-fab',
    template,
    containerless: true
})
export class MooFab implements ICustomElementViewModel {
    @bindable icon: string;
    @bindable text: string;
    @bindable class: string;
    @bindable click;
    @bindable external: boolean;
    @bindable url: string;
    fabEl: HTMLElement;

    attached() {
        new MDCRipple(this.fabEl);
    }

    handleClick() {
        if (this.click) {
            this.click();
        }
    }
}
