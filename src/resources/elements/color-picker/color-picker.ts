import {bindable} from 'aurelia';

export class ColorPicker {
    @bindable label;
    @bindable value;
    color;

    bound() {
        this.color = `#${this.value.toString(16)}`;
    }

    getDecimalValue() {
        let replaced = this.color.replace('#', '');
        this.value = parseInt(replaced, 16);
    }
}
