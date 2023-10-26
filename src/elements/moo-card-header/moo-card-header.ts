import {bindable, containerless, ICustomElementViewModel} from "@aurelia/runtime-html";

@containerless()
export class MooCardHeader implements ICustomElementViewModel {
    @bindable outlined: boolean;
}
