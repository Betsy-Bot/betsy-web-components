import './moo-form-field.scss';

import { MDCFormField } from '@material/form-field';
import {bindable, ICustomElementViewModel} from "@aurelia/runtime-html";

export class MooFormField implements ICustomElementViewModel {
    static containerless = true;
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
