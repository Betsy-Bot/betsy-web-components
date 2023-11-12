import {bindable, BindingMode, customElement, ICustomElementViewModel} from '@aurelia/runtime-html';

import template from './moo-text-field.html?raw';

export type MOO_TEXT_FIELD_VARIANT = 'filled' | 'outlined';

@customElement({ name: 'moo-text-field', template, containerless: true, capture: true })
export class MooTextField implements ICustomElementViewModel {
    @bindable({ mode: BindingMode.twoWay }) value: string | number | undefined | null;
    @bindable variant: MOO_TEXT_FIELD_VARIANT = 'outlined';
    mdElement: HTMLInputElement;

    attached() {
        this.mdElement.addEventListener('keyup', () => this.value = this.mdElement.value)
    }
}
