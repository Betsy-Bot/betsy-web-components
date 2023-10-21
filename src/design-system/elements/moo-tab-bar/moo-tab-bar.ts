import { bindable, capture, containerless, ICustomElementViewModel } from 'aurelia';

import './moo-tab-bar.scss';

import { MDCTabBar } from '@material/tab-bar';

@containerless()
@capture()
export class MooTabBar implements ICustomElementViewModel {
    @bindable id;
    @bindable class;
    tabBarEl: HTMLButtonElement;

    attached() {
        new MDCTabBar(this.tabBarEl);
    }
}
