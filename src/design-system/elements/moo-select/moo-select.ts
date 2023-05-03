import { bindable, BindingMode, containerless, ICustomElementViewModel } from "aurelia";

import { MDCSelect } from '@material/select';

@containerless()
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
