import {customAttribute, ICustomAttributeViewModel, INode} from "@aurelia/runtime-html";
import {resolve} from "@aurelia/kernel";

@customAttribute({ name: 'full-width' })
export class FullWidth implements ICustomAttributeViewModel {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    private element: HTMLElement = resolve(INode)
    constructor() {
        this.element.style.width = '100%';
    }
}
