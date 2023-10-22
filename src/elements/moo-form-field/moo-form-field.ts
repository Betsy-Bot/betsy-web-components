import { bindable, containerless, ICustomElementViewModel } from 'aurelia';

import './moo-form-field.scss';

import { MDCFormField } from '@material/form-field';

@containerless()
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
