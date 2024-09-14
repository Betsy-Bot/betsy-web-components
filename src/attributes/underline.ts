import {customAttribute, ICustomAttributeViewModel, INode} from "@aurelia/runtime-html";
import {resolve} from "@aurelia/kernel";

@customAttribute({ name: 'underline' })
export class Underline implements ICustomAttributeViewModel {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    private element: HTMLElement = resolve(INode)
    constructor() {
        this.element.style.textDecoration = 'underline';
    }
}
