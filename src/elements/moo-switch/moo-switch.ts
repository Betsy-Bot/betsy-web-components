import '@material/web/switch/switch';

import { MdSwitch } from '@material/web/all';
import { bindable, BindingMode, customElement, ICustomElementViewModel } from "@aurelia/runtime-html";
import template from './moo-switch.html?raw';
@customElement({name:'moo-switch', template, containerless: true})
export class MooSwitch implements ICustomElementViewModel {
    @bindable({ mode: BindingMode.twoWay }) value: boolean;
    @bindable class: string;
    @bindable change: () => void;
    @bindable label: string;
    switch: MdSwitch;

    attached() {
        this.switch.selected = this.value;
        this.switch.addEventListener('change', () => this.handleChange());
    }

    handleChange() {
        this.value = !this.value;
        this.change();
    }
}
