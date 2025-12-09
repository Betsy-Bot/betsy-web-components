import { bindable, BindingMode, customElement, ICustomElementViewModel } from '@aurelia/runtime-html';

export interface IMooSelectOption {
    label: string;
    value: string
}

export type MooSelectType = 'filled' | 'outlined';

import template from './moo-select.html?raw';
import {MdFilledSelect, MdOutlinedSelect} from "@material/web/all";

@customElement({ name: 'moo-select', template, containerless: true, capture: true })
export class MooSelect implements ICustomElementViewModel {
    @bindable options: IMooSelectOption[];
    @bindable({ mode: BindingMode.twoWay }) value: string | number | undefined;
    @bindable variant: MooSelectType = 'outlined';
    @bindable includeNull = false;
    selectEl: MdFilledSelect | MdOutlinedSelect;

    handleChange(e: Event) {
        this.value = (e.target as HTMLSelectElement).value;
    }

    public reset() {
        this.selectEl.reset();
    }

    shouldBeSelected(option: IMooSelectOption | null) {
        if (this.includeNull && !this.value) {
            return true;
        }
        if (!option) {
            return false
        }
        return option.value == this.value;
    }
}
