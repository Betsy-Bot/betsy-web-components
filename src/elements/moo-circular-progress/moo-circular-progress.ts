import { bindable, containerless, ICustomElementViewModel } from 'aurelia';

import './moo-circular-progress.scss';

import { MDCCircularProgress } from '@material/circular-progress';

@containerless()
export class MooCircularProgress implements ICustomElementViewModel {
    progressEl: HTMLElement;
    @bindable size: number;
    attached() {
        const progress = new MDCCircularProgress(this.progressEl);
        progress.determinate = false;
        progress.open();
    }
}
