import {bindable, customAttribute, ICustomAttributeViewModel, INode} from "@aurelia/runtime-html";
import {resolve} from "@aurelia/kernel";

@customAttribute({name: 'align'})
export class Align implements ICustomAttributeViewModel {
    @bindable()
    public value?: string;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    private element: HTMLElement = resolve(INode)

    public afterBind(): void {
        this.element.style.textAlign = this.value ?? '';
    }

    /* Example of change detection */
    public valueChanged(): void {
        this.afterBind();
    }
}
