import './moo-topbar.scss';

import { MDCTopAppBar } from '@material/top-app-bar';
import {customElement, ICustomElementViewModel} from "@aurelia/runtime-html";

import template from './moo-topbar.html?raw';
@customElement({name:'moo-topbar', template, containerless: true})
export class MooTopbar implements ICustomElementViewModel {
    header: HTMLElement;
    attached() {
        new MDCTopAppBar(this.header);
    }
}
