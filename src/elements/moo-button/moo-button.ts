import {bindable, customElement, ICustomElementViewModel} from 'aurelia';

import template from './moo-button.html';
import './moo-button.scss';

@customElement({
    name: 'moo-button',
    template,
})
export class MooButton implements ICustomElementViewModel {
    button: HTMLButtonElement;
    @bindable label;
    @bindable icon;
}
