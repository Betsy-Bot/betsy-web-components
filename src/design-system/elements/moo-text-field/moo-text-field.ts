import {
    bindable,
    BindingMode,
    customElement,
    ICustomElementViewModel,
} from "aurelia";
import template from "./moo-text-field.html";
import { MDCTextField } from "@material/textfield";
import "./moo-text-field.scss";

@customElement({
    name: "moo-text-field",
    template,
    containerless: true,
})
export class MooTextField implements ICustomElementViewModel {
    @bindable({ mode: BindingMode.twoWay }) value;
    @bindable label;
    @bindable class;
    @bindable type;
    @bindable rows;
    @bindable cols;
    input: HTMLElement;
    textField;

    attached() {
        this.textField = new MDCTextField(this.input);
    }
}
