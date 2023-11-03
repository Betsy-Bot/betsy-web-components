import './moo-chip-set.scss';

import { MDCChipSet } from '@material/chips';
import {bindable, customElement, ICustomElementViewModel} from "@aurelia/runtime-html";

import template from './moo-chip-set.html?raw';
@customElement({name:'moo-chip-set', template, containerless: true})
export class MooChipSet implements ICustomElementViewModel {
    chipSetEl: HTMLElement;
    @bindable size: number;
    attached() {
        new MDCChipSet(this.chipSetEl);
    }
}
