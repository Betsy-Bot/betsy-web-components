import {bindable, BindingMode, customElement, ICustomElementViewModel} from "@aurelia/runtime-html";

import template from './moo-tab.html?raw';
@customElement({name:'moo-tab', template, containerless: true})
export class MooTab implements ICustomElementViewModel {
    @bindable({ mode: BindingMode.twoWay }) active: boolean;
    @bindable id;
    @bindable class;
    @bindable label;
    @bindable icon;
    @bindable({ mode: BindingMode.twoWay }) tab;
    @bindable value;

    get tabClass() {
        if (this.active) {
            return 'mdc-tab--active'
        }
        return '';
    }

    get indicatorClass() {
        if (this.active) {
            return 'mdc-tab-indicator--active';
        }
        return '';
    }

    setTab() {
        this.tab = this.value;
    }
}
