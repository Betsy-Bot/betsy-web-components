import { bindable } from 'aurelia';

import './color-picker.scss'

export class ColorPicker {
    @bindable label;
    @bindable value;
    color;

    attached() {
        this.color = `#${this.value?.toString(16)}`;
    }

    getDecimalValue() {
        const replaced = this.color.replace('#', '');
        this.value = parseInt(replaced, 16);
    }
}
