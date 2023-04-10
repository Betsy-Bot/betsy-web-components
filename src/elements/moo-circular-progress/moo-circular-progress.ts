import {bindable, customElement, ICustomElementViewModel} from 'aurelia';
import template from './moo-circular-progress.html';
import { MDCCircularProgress } from '@material/circular-progress';
import './moo-circular-progress.scss';

@customElement({
    name: 'moo-circular-progress',
    template,
    containerless: true
})
export class MooCircularProgress implements ICustomElementViewModel {
    progressEl: HTMLElement;
    @bindable size: number;
    attached() {
         const progress = new MDCCircularProgress(this.progressEl);
         progress.determinate = false;
         progress.open();
    }
}
