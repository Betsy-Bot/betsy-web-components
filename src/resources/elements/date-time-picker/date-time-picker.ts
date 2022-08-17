import flatpickr from "flatpickr";
import {bindable} from "aurelia-framework";

export class DateTimePicker {
    @bindable value: string;
    pickerValue;
    @bindable label;
    @bindable required;
    pickerElement;
    config = {
        enableTime: true ,
        onChange: (selectedDates, dateStr, instance) => this.value = new Date(dateStr).toISOString()
    };

    attached() {
        if (this.value) {
            this.pickerValue = this.value;
        }
        flatpickr(this.pickerElement, this.config);
    }

    valueChanged() {
        console.log(this.value);
    }

    get displayValue() {
        if (!this.value) return;
        return new Date(this.value).toUTCString()
    }
}
