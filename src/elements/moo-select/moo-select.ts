import { MDCSelect } from '@material/select';
import {bindable, BindingMode, containerless, ICustomElementViewModel} from "@aurelia/runtime-html";

@containerless()
export class MooSelect implements ICustomElementViewModel {
    @bindable label: string;
    @bindable options;
    @bindable({ mode: BindingMode.twoWay }) value: string | number | undefined;
    @bindable class;
    @bindable required: boolean;
    @bindable readonly: boolean;
    selectEl: HTMLElement;

    attached() {
        const select = new MDCSelect(this.selectEl);
        if (this.readonly) {
            select.disabled = true;
        }
        if (typeof this.value != 'undefined') {
            select.value = this.value?.toString();
        }

        select.listen('MDCSelect:change', () => {
            if (typeof(this.value) == 'number') {
                return this.value = parseInt(select.value);
            }
            this.value = select.value;
        });
    }

    get requiredClass() {
        if (this.required) {
            return 'mdc-select--required';
        }
    }
}
