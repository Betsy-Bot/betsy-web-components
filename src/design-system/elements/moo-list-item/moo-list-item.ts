import {bindable, customElement, ICustomElementViewModel} from "aurelia";
import template from "./moo-list-item.html";

@customElement({
    name: 'moo-list-item',
    template,
    containerless: true
})
export class MooListItem implements ICustomElementViewModel {
    @bindable label;
    @bindable value;
    @bindable route;
}
