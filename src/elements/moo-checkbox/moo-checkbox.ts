import { bindable, BindingMode, containerless, ICustomElementViewModel } from 'aurelia';

import './moo-checkbox.scss';

import { MDCCheckbox } from '@material/checkbox';

@containerless()
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
