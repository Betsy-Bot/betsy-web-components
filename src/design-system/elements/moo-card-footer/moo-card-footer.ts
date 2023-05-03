import { bindable, containerless, ICustomElementViewModel } from "aurelia";

@containerless()
export class MooCardFooter implements ICustomElementViewModel {
    @bindable outlined: boolean;
}
