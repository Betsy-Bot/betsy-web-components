import {bindable, BindingMode, customElement, ICustomElementViewModel} from "aurelia";
import template from "./moo-select.html";
import {MDCSelect} from '@material/select';

@customElement({
    name: 'moo-select',
    template,
    containerless: true
})
export class MooSelect implements ICustomElementViewModel {
    @bindable label;
    @bindable options;
    @bindable({mode: BindingMode.twoWay}) value;
    @bindable class;
    selectEl: HTMLElement;

    attached() {
        const select = new MDCSelect(this.selectEl);
        select.value = this.value;

        select.listen('MDCSelect:change', () => {
            this.value = select.value;
        });
    }
}
