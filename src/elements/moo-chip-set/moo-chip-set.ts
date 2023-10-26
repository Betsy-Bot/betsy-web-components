import './moo-chip-set.scss';

import { MDCChipSet } from '@material/chips';
import {bindable, containerless, ICustomElementViewModel} from "@aurelia/runtime-html";


@containerless()
export class MooChipSet implements ICustomElementViewModel {
    chipSetEl: HTMLElement;
    @bindable size: number;
    attached() {
        new MDCChipSet(this.chipSetEl);
    }
}
