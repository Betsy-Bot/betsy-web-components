import {bindable, containerless, ICustomElementViewModel} from "@aurelia/runtime-html";

export class MooCardHeader implements ICustomElementViewModel {
    static containerless = true;
    @bindable outlined: boolean;
}
