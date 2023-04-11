import { customAttribute, ICustomAttributeViewModel, INode } from 'aurelia';

@customAttribute({ name: 'full-height' })
export class FullHeight implements ICustomAttributeViewModel {
  constructor(@INode private readonly element: HTMLElement) {
    this.element.style.height = '100%';
  }
}
