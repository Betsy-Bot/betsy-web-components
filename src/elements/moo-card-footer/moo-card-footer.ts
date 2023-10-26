import {bindable, containerless, ICustomElementViewModel} from "@aurelia/runtime-html";

@containerless()
export class MooCardFooter implements ICustomElementViewModel {
    @bindable outlined: boolean;
}
