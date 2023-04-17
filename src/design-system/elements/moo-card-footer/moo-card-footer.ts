import { bindable, customElement, ICustomElementViewModel } from "aurelia";
import template from "./moo-card-footer.html";

@customElement({
    name: "moo-card-footer",
    template,
    containerless: true,
})
export class MooCardFooter implements ICustomElementViewModel {
    @bindable outlined: boolean;
}
