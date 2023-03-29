import { bindable, customAttribute, ICustomAttributeViewModel, INode } from 'aurelia';

@customAttribute({ name: 'align' })
export class Align implements ICustomAttributeViewModel {
  @bindable()
  public value?: string;

  constructor(@INode private readonly element: HTMLElement) {}

  public afterBind(): void {
    this.element.style.textAlign = this.value ?? '';
  }

  /* Example of change detection */
  public valueChanged(): void {
    this.afterBind();
  }
}
