import {
    bindable,
    BindingMode, containerless,
    ICustomElementViewModel,
} from 'aurelia';
import '@material/web/switch/switch';
import './moo-switch.scss';

import { MdSwitch } from '@material/web/all';

@containerless()
export class MooSwitch implements ICustomElementViewModel {
    @bindable({ mode: BindingMode.twoWay }) value: boolean;
    @bindable class: string;
    @bindable change: () => void;
    @bindable label: string;
    switch: MdSwitch;

    attached() {
        this.switch.selected = this.value;
        this.switch.addEventListener('change', (e) => this.handleChange(e));
    }

    handleChange(e) {
        this.value = !this.value;
        this.change();
    }
}
