import { bindable, customAttribute, ICustomAttributeViewModel, INode, IPlatform } from 'aurelia';

@customAttribute({ name: 'link', noMultiBindings: true })
export class Link implements ICustomAttributeViewModel {
  @bindable public value = '';

  constructor(@INode private readonly htmlElement: HTMLElement, @IPlatform private readonly platform: IPlatform) {
    htmlElement.addEventListener('mousedown', this.clickEvent);
  }

  clickEvent = () => {
    this.platform.window.open(this.value, '_blank');
  };

  detaching() {
    this.htmlElement.removeEventListener('mousedown', this.clickEvent);
  }
}
