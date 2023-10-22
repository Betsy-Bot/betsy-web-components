import { bindable, containerless, ICustomElementViewModel } from 'aurelia';

import './moo-chip-set.scss';

import { MDCChipSet } from '@material/chips';


@containerless()
export class MooChipSet implements ICustomElementViewModel {
    chipSetEl: HTMLElement;
    @bindable size: number;
    attached() {
        new MDCChipSet(this.chipSetEl);
    }
}
