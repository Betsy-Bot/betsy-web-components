import {customAttribute, ICustomAttributeViewModel, INode} from "@aurelia/runtime-html";

@customAttribute({ name: 'full-height' })
export class FullHeight implements ICustomAttributeViewModel {
    constructor(@INode private readonly element: HTMLElement) {
        this.element.style.height = '100%';
    }
}
