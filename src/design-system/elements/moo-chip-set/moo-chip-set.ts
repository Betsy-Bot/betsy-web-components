import { bindable, customElement, ICustomElementViewModel } from 'aurelia';

import template from './moo-chip-set.html';

import './moo-chip-set.scss';

import { MDCChipSet } from "@material/chips";


@customElement({
    name: 'moo-chip-set',
    template,
    containerless: true
})
export class MooChipSet implements ICustomElementViewModel {
    chipSetEl: HTMLElement;
    @bindable size: number;
    attached() {
        new MDCChipSet(this.chipSetEl);
    }
}
