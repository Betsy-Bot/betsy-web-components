import {bindable, BindingMode, customElement, ICustomElementViewModel} from "aurelia";
import {MDCSwitch} from '@material/switch';
import template from "./moo-switch.html";
import './moo-switch.scss';

@customElement({
    name: 'moo-switch',
    template,
    containerless: true
})
export class MooSwitch implements ICustomElementViewModel {
    @bindable({mode: BindingMode.twoWay}) value: boolean;
    @bindable id;
    @bindable class;
    switchEl: HTMLButtonElement;

    attached() {
        new MDCSwitch(this.switchEl);
    }

    changeValue() {
        this.value = !this.value;
    }

    get switchClass() {
        if (this.value) {
            return 'mdc-switch--selected'
        }
        return 'mdc-switch--unselected'
    }
}
