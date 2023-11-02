import './moo-form-field.scss';

import {MDCFormField} from '@material/form-field';
import {bindable, customElement, ICustomElementViewModel} from "@aurelia/runtime-html";

import template from './moo-form-field.html?raw';

@customElement({name: 'moo-form-field', template, containerless: true})
export class MooFormField implements ICustomElementViewModel {
    @bindable label;
    @bindable options;
    @bindable class;
    @bindable disabled: boolean;
    formFieldEl: HTMLElement;
    formField: MDCFormField;

    attached() {
        this.formField = new MDCFormField(this.formFieldEl);
    }

}
