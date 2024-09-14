import {bindable, customAttribute, ICustomAttributeViewModel, INode} from "@aurelia/runtime-html";
import {IPlatform, resolve} from "@aurelia/kernel";

@customAttribute({ name: 'link', noMultiBindings: true })
export class Link implements ICustomAttributeViewModel {
  @bindable public value = '';

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    private element: HTMLElement = resolve(INode)
    private platform: IPlatform = resolve(IPlatform)

  constructor() {
      this.element.addEventListener('mousedown', this.clickEvent);
  }

  clickEvent = () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      this.platform.window.open(this.value, '_blank');
  };

  detaching() {
      this.element.removeEventListener('mousedown', this.clickEvent);
  }
}
