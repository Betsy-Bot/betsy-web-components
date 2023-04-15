import {
    bindable,
    BindingMode,
    customElement,
    ICustomElementViewModel,
    observable,
} from "aurelia";
import template from "./moo-text-field.html";
import { MDCTextField } from "@material/textfield";
import "./moo-text-field.scss";
import { watch } from "@aurelia/runtime-html";

@customElement({
    name: "moo-text-field",
    template,
    containerless: true,
})
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
    textField;

    attached() {
        if (this.input) {
            this.textField = new MDCTextField(this.input);
        }
    }
}
