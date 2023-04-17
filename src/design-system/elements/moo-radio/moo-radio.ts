import { bindable, BindingMode, customElement, ICustomElementViewModel } from "aurelia";
import { watch } from "@aurelia/runtime-html";

import template from "./moo-radio.html";

import './moo-radio.scss'

import { MDCRadio } from '@material/radio';

@customElement({
    name: 'moo-radio',
    template,
    containerless: true
})
export class MooRadio implements ICustomElementViewModel {
    @bindable label;
    @bindable options;
    @bindable({ mode: BindingMode.twoWay }) model;
    @bindable({ mode: BindingMode.twoWay }) value;
    @bindable class;
    @bindable disabled: boolean;
    checked = false;
    radioEl: HTMLElement;
    radio: MDCRadio;

    attached() {
        if (this.model == this.value) {
            this.checked = true;
        }
        console.log('this.model', this.model);
        console.log('this.value', this.value);
        this.radio = new MDCRadio(this.radioEl);
        console.log(this.checked);
    }

    clickHandler() {
        console.log('clicked', this.radio.value)
    }

    @watch('radio.checked')
    handleRadioChecked() {
        console.log('radio checked', this.radio.checked);
    }

    @watch('radio')
    handleRadioValue() {
        console.log('radio value', this.radio.value);
    }

    @watch('checked')
    handleCheckChanged() {
        console.log('this.checked', this.checked);
    }
}
