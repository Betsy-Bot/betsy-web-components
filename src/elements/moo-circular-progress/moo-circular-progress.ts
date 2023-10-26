import './moo-circular-progress.scss';

import { MDCCircularProgress } from '@material/circular-progress';
import {bindable, ICustomElementViewModel} from "@aurelia/runtime-html";

export class MooCircularProgress implements ICustomElementViewModel {
    static containerless = true;
    progressEl: HTMLElement;
    @bindable size: number;
    attached() {
        const progress = new MDCCircularProgress(this.progressEl);
        progress.determinate = false;
        progress.open();
    }
}
