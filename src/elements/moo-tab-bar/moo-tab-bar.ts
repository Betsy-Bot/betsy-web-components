import './moo-tab-bar.scss';

import { MDCTabBar } from '@material/tab-bar';
import {bindable, customElement, ICustomElementViewModel} from "@aurelia/runtime-html";

import template from './moo-tab-bar.html?raw';
@customElement({name:'moo-tab-bar', template, containerless: true, capture: true})
export class MooTabBar implements ICustomElementViewModel {
    @bindable id: string;
    @bindable class: string;
    tabBarEl: HTMLButtonElement;

    attached() {
        new MDCTabBar(this.tabBarEl);
    }
}
