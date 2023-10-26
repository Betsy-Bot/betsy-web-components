import './moo-tab-bar.scss';

import { MDCTabBar } from '@material/tab-bar';
import {bindable, ICustomElementViewModel} from "@aurelia/runtime-html";


export class MooTabBar implements ICustomElementViewModel {
    static containerless = true;
    static capture = true;
    @bindable id: string;
    @bindable class: string;
    tabBarEl: HTMLButtonElement;

    attached() {
        new MDCTabBar(this.tabBarEl);
    }
}
