import './moo-chip-set.scss';

import { MDCChipSet } from '@material/chips';
import {bindable, ICustomElementViewModel} from "@aurelia/runtime-html";


export class MooChipSet implements ICustomElementViewModel {
    static containerless = true;
    chipSetEl: HTMLElement;
    @bindable size: number;
    attached() {
        new MDCChipSet(this.chipSetEl);
    }
}
