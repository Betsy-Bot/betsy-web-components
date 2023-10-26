import {bindable, containerless, ICustomElementViewModel} from "@aurelia/runtime-html";

export class MooCardFooter implements ICustomElementViewModel {
    static containerless = true;
    @bindable outlined: boolean;
}
