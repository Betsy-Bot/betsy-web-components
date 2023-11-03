import { bindable, BindingMode, customElement, ICustomElementViewModel } from '@aurelia/runtime-html';

export interface IMooSelectOption {
    label: string;
    value: string
}

export type MooSelectType = 'filled' | 'outlined';

import template from './moo-select.html?raw';

@customElement({ name: 'moo-select', template, containerless: true })
export class MooSelect implements ICustomElementViewModel {
    @bindable label: string;
    @bindable options: IMooSelectOption[];
    @bindable({ mode: BindingMode.twoWay }) value: string | number | undefined;
    @bindable class: string;
    @bindable required: boolean;
    @bindable readonly: boolean;
    @bindable selectType: MooSelectType = 'outlined';
    @bindable includeNull = false;

    handleChange(e: Event) {
        this.value = (e.target as HTMLSelectElement).value;
    }

    shouldBeSelected(option: IMooSelectOption | null) {
        if (!this.includeNull && !this.value) {
            return true;
        }
        if (!option) {
            return false
        }
        return option.value == this.value;
    }
}
