import { bindable, BindingMode, customElement, ICustomElementViewModel } from "aurelia";

import template from "./moo-select.html";

import { MDCSelect } from '@material/select';

@customElement({
    name: 'moo-select',
    template,
    containerless: true
})
export class MooSelect implements ICustomElementViewModel {
    @bindable label;
    @bindable options;
    @bindable({ mode: BindingMode.twoWay }) value: string | number | undefined;
    @bindable class;
    @bindable required;
    selectEl: HTMLElement;

    attached() {
        const select = new MDCSelect(this.selectEl);
        if (this.value) {
            select.value = this.value.toString();
        }

        select.listen('MDCSelect:change', () => {
            this.value = select.value;
        });
    }

    get requiredClass() {
        if (this.required) {
            return "mdc-select--required"
        }
    }
}
