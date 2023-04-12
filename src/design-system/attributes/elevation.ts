import {bindable, customAttribute, ICustomAttributeViewModel, INode} from 'aurelia';

@customAttribute({ name: 'elevation' })
export class Elevation implements ICustomAttributeViewModel {
    @bindable()
    public value?: string;

    constructor(@INode private readonly element: HTMLElement) {
    }

    public afterBind(): void {
        console.log('after bind');
        this.element.style.boxShadow = `0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)`;
        this.element.style.border = "1px solid black";
        this.element.style.borderRadius = "5px";
    }

    /* Example of change detection */
    public valueChanged(): void {
        this.afterBind();
    }
}
