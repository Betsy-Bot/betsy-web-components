import {customAttribute, ICustomAttributeViewModel, INode} from "@aurelia/runtime-html";

@customAttribute({ name: 'underline' })
export class Underline implements ICustomAttributeViewModel {
    constructor(@INode private readonly element: HTMLElement) {
        this.element.style.textDecoration = 'underline';
    }
}
