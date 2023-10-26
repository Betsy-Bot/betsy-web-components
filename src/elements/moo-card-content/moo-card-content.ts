import {bindable, containerless, ICustomElementViewModel} from "@aurelia/runtime-html";

export class MooCardContent implements ICustomElementViewModel {
    static containerless = true;
    @bindable outlined: boolean;
}
