import { bindable, customAttribute, ICustomAttributeViewModel, INode } from 'aurelia';

@customAttribute({ name: 'elevation' })
export class Elevation implements ICustomAttributeViewModel {
    @bindable()
    public value?: string;

    constructor(@INode private readonly element: HTMLElement) {
        this.element.style.boxShadow = `0 8px 12px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.08)`;
        //this.element.style.border = "1px solid black";
        this.element.style.borderRadius = "5px";
    }
}
