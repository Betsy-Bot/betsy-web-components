import {bindable, BindingMode, customElement, ICustomElementViewModel} from "@aurelia/runtime-html";

import template from './moo-list-item.html?raw';
@customElement({name:'moo-list-item', template, containerless: true})
export class MooListItem implements ICustomElementViewModel {
    @bindable label: string;
    @bindable({ mode: BindingMode.twoWay }) value: string | number | null;
    @bindable route: string;
    @bindable click: (value: string | number | null) => void;
    @bindable disabled = false;

    clickHandler() {
        if (this.click) {
            this.click(this.value);
        }
    }

    get disabledClass() {
        if (this.disabled) {
            return 'mdc-deprecated-list-item--disabled';
        }
    }
}
