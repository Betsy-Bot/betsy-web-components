import {
    bindable,
    BindingMode, containerless,
    ICustomElementViewModel,
} from "aurelia";


@containerless()
export class MooListItem implements ICustomElementViewModel {
    @bindable label;
    @bindable({ mode: BindingMode.twoWay }) value;
    @bindable route;
    @bindable click;
    @bindable disabled = false;

    clickHandler() {
        console.log('click value', this.value)
        if (this.click) {
            this.click(this.value);
        }
    }

    get disabledClass() {
        if (this.disabled) {
            return 'mdc-deprecated-list-item--disabled';
        }
    }
}
