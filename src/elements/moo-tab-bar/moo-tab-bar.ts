import {bindable, customElement, ICustomElementViewModel} from "aurelia";
import {MDCTabBar} from '@material/tab-bar';
import template from "./moo-tab-bar.html";
import './moo-tab-bar.scss';

@customElement({
    name: 'moo-tab-bar',
    template,
    containerless: true
})
export class MooTabBar implements ICustomElementViewModel {
    @bindable id;
    @bindable class;
    tabBarEl: HTMLButtonElement;

    attached() {
        new MDCTabBar(this.tabBarEl);
    }
}
