import {bindable, customAttribute, ICustomAttributeViewModel, INode} from "@aurelia/runtime-html";
import {IPlatform} from "@aurelia/kernel";

@customAttribute({ name: 'link', noMultiBindings: true })
export class Link implements ICustomAttributeViewModel {
  @bindable public value = '';

  constructor(@INode private readonly htmlElement: HTMLElement, @IPlatform private readonly platform: IPlatform) {
      htmlElement.addEventListener('mousedown', this.clickEvent);
  }

  clickEvent = () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      this.platform.window.open(this.value, '_blank');
  };

  detaching() {
      this.htmlElement.removeEventListener('mousedown', this.clickEvent);
  }
}
