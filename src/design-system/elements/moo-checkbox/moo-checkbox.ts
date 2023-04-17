import {bindable, BindingMode, customElement, ICustomElementViewModel} from 'aurelia';
import template from './moo-checkbox.html';
import './moo-checkbox.scss';
import {MDCCheckbox} from '@material/checkbox';
import {watch} from "@aurelia/runtime-html";

@customElement({
    name: 'moo-checkbox',
    template,
    containerless: true
})
export class MooCheckbox implements ICustomElementViewModel {
    checkboxEl: HTMLElement;
    @bindable({ mode: BindingMode.twoWay }) checked: boolean;
    @bindable changed;
    @bindable({ mode: BindingMode.twoWay }) value: string;

    attached() {
        new MDCCheckbox(this.checkboxEl);
    }

    checkedChanged() {
        if (this.changed) {
            this.changed(this.value, this.checked);
        }
    }
}
