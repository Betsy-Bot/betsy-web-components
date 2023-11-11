import { bindable, BindingMode, customElement, ICustomElementViewModel } from '@aurelia/runtime-html';

import template from './moo-checkbox.html?raw';

import './moo-checkbox.scss';

@customElement({ name: 'moo-checkbox', template, containerless: true, capture: true })
export class MooCheckbox implements ICustomElementViewModel {
    @bindable({ mode: BindingMode.twoWay }) checked: boolean;
    @bindable changed: (value: string, checked: boolean) => void;
    @bindable({ mode: BindingMode.twoWay }) value: string;

    handleChange() {
        this.checked = !this.checked;
        if (this.changed) {
            this.changed(this.value, this.checked);
        }
    }
}
