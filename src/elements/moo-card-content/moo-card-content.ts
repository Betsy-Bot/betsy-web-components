import {bindable, containerless, ICustomElementViewModel} from "@aurelia/runtime-html";

@containerless()
export class MooCardContent implements ICustomElementViewModel {
    @bindable outlined: boolean;
}
