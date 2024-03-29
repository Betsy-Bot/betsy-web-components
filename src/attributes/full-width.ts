import {customAttribute, ICustomAttributeViewModel, INode} from "@aurelia/runtime-html";

@customAttribute({ name: 'full-width' })
export class FullWidth implements ICustomAttributeViewModel {
    constructor(@INode private readonly element: HTMLElement) {
        this.element.style.width = '100%';
    }
}
