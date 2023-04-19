import {
    bindable,
    BindingMode,
    customElement,
    ICustomElementViewModel,
} from "aurelia";

import template from "./moo-list-item.html";

@customElement({
    name: "moo-list-item",
    template,
    containerless: true,
})
export class MooListItem implements ICustomElementViewModel {
    @bindable label;
    @bindable({ mode: BindingMode.twoWay }) value;
    @bindable route;
    @bindable click;

    clickHandler() {
        if (this.click) {
            this.click();
        }
    }
}
