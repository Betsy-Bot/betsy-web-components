import {
    bindable,
    BindingMode,
    customElement,
    ICustomElementViewModel,
} from "aurelia";
import {watch} from '@aurelia/runtime-html';
import { MDCSwitch } from "@material/switch";
import template from "./moo-switch.html";
import "./moo-switch.scss";

@customElement({
    name: "moo-switch",
    template,
    containerless: true,
})
export class MooSwitch implements ICustomElementViewModel {
    @bindable({ mode: BindingMode.twoWay }) value: boolean;
    @bindable id;
    @bindable class: string;
    @bindable change;
    switchEl: HTMLButtonElement;
    switch: MDCSwitch;

    attached() {
        this.switch = new MDCSwitch(this.switchEl);
    }

    @watch('value')
    valueChangedHandler() {
        this.switch.selected = this.value;
    }

    changeValue() {
        this.value = !this.value;
        if (this.change) {
            this.change();
        }
    }

    get switchClass() {
        if (this.value) {
            return "mdc-switch--selected";
        }
        return "mdc-switch--unselected";
    }
}
