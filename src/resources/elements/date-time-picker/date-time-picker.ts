import { bindable, BindingMode } from 'aurelia';

import { MDCTextField } from '@material/textfield';
import flatpickr from 'flatpickr';

export class DateTimePicker {
    @bindable({ mode: BindingMode.twoWay }) value: string;
    pickerValue;
    @bindable label;
    @bindable required;
    inputEl;
    labelEl;
    config = {
        enableTime: true,
        onChange: (selectedDates, dateStr, instance) =>
            (this.value = new Date(dateStr).toISOString()),
    };
    textField;

    attached() {
        this.textField = new MDCTextField(this.labelEl);
        if (this.value) {
            this.pickerValue = this.value;
        }
        flatpickr(this.inputEl, this.config);
    }

    get displayValue() {
        if (!this.value) return;
        return new Date(this.value).toUTCString();
    }
}
