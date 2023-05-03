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

    clickHandler() {
        if (this.click) {
            this.click(this.value);
        }
    }
}
