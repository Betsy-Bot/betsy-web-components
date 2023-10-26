import './moo-tab-bar.scss';

import { MDCTabBar } from '@material/tab-bar';
import {bindable, capture, containerless, ICustomElementViewModel} from "@aurelia/runtime-html";

@containerless()
@capture()
export class MooTabBar implements ICustomElementViewModel {
    @bindable id: string;
    @bindable class: string;
    tabBarEl: HTMLButtonElement;

    attached() {
        new MDCTabBar(this.tabBarEl);
    }
}
