import './moo-checkbox.scss';
import { MDCCheckbox } from '@material/checkbox';
import {bindable, BindingMode, containerless, ICustomElementViewModel} from "@aurelia/runtime-html";

export class MooCheckbox implements ICustomElementViewModel {
    static containerless = true;
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
