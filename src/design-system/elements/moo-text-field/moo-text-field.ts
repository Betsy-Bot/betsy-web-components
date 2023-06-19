import {
    bindable,
    BindingMode, containerless,
    ICustomElementViewModel,
    observable,
} from "aurelia";

import "./moo-text-field.scss";

import { MDCTextField } from "@material/textfield";

@containerless()
export class MooTextField implements ICustomElementViewModel {
    @bindable({ mode: BindingMode.twoWay }) value;
    @bindable label;
    @bindable class;
    @bindable type = "text";
    @bindable rows;
    @bindable cols;
    @observable input: HTMLElement;
    @bindable readonly;
    @bindable min: number;
    @bindable max: number;
    @bindable minlength: number;
    @bindable maxlength: number;
    @bindable required;
    @bindable placeholder;
    textField;

    attached() {
        if (this.input) {
            this.textField = new MDCTextField(this.input);
        }
    }

    get floatLabelClass(): string {
        if (this.value == undefined) {
            return ''
        }
        return 'mdc-text-field--label-floating';
    }
}
