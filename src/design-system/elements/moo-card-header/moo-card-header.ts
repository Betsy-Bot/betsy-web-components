import { bindable, customElement, ICustomElementViewModel } from "aurelia";
import template from "./moo-card-header.html";

@customElement({
    name: "moo-card-header",
    template,
    containerless: true,
})
export class MooCardHeader implements ICustomElementViewModel {
    @bindable outlined: boolean;
}
