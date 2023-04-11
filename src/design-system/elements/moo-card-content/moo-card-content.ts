import { bindable, customElement, ICustomElementViewModel } from "aurelia";
import template from "./moo-card-content.html";

@customElement({
    name: "moo-card-content",
    template,
    containerless: true,
})
export class MooCardContent implements ICustomElementViewModel {
    @bindable outlined: boolean;
}
