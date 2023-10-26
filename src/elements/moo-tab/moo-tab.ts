import {bindable, BindingMode, ICustomElementViewModel} from "@aurelia/runtime-html";

export class MooTab implements ICustomElementViewModel {
    static containerless = true;

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
