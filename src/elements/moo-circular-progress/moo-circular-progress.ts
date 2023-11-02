import './moo-circular-progress.scss';

import { MDCCircularProgress } from '@material/circular-progress';
import {bindable, customElement, ICustomElementViewModel} from "@aurelia/runtime-html";

import template from './moo-circular-progress.html?raw';
@customElement({name:'moo-circular-progress', template, containerless: true})
export class MooCircularProgress implements ICustomElementViewModel {
    progressEl: HTMLElement;
    @bindable size: number;
    attached() {
        const progress = new MDCCircularProgress(this.progressEl);
        progress.determinate = false;
        progress.open();
    }
}
