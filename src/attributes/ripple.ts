import { bindable, customAttribute, ICustomAttributeViewModel, IPlatform } from 'aurelia';

@customAttribute({ name: 'ripple' })
export class Ripple implements ICustomAttributeViewModel {
  @bindable public speed = 1;
  @bindable({ primary: true }) public color = '';
  rippleContainer?: HTMLDivElement;
  ripple?: HTMLDivElement;

  constructor(private readonly htmlElement?: HTMLElement, @IPlatform private readonly platform?: IPlatform) {
    htmlElement?.addEventListener('mousedown', this.rippleEvent);
  }

  rippleEvent = (event: MouseEvent) => {
    if (!this.htmlElement) return;
    const offsetInfo = this.htmlElement.getBoundingClientRect();
    this.createContainer(offsetInfo);
    this.createRipple(offsetInfo, event);
  };

  createRipple = (offsetInfo: DOMRect, event: MouseEvent) => {
    const maxLength = offsetInfo.width > offsetInfo.height ? offsetInfo.width : offsetInfo.height;
    const circleD = maxLength * 2;
    this.ripple = document.createElement('div');
    this.ripple.style.position = 'absolute';
    this.ripple.style.pointerEvents = 'none';
    this.ripple.style.width = `${circleD}px`;
    this.ripple.style.height = `${circleD}px`;
    this.ripple.style.borderRadius = '500px';
    this.ripple.style.left = `${event.pageX - offsetInfo.left - circleD / 2}px`;
    this.ripple.style.top = `${event.pageY - offsetInfo.top - circleD / 2}px`;
    this.ripple.style.animationDuration = `${this.speed}s`;
    this.ripple.style.background = this.color || 'rgba(var(--san-juan-900-rgb), var(--alpha-sm))';
    this.ripple.className = 'ripple';
    this.rippleContainer?.appendChild(this.ripple);
    this.ripple.addEventListener('animationend', this.removeContainer, false);
  };

  private createContainer(offsetInfo: DOMRect) {
    if (!this.htmlElement) return;
    const ripplerContainer = this.htmlElement.querySelector('.ripple-container');
    if (ripplerContainer) {
      ripplerContainer.remove();
    }
    this.rippleContainer = document.createElement('div');
    this.rippleContainer.style.position = 'fixed';
    this.rippleContainer.style.zIndex = '99';
    this.rippleContainer.style.width = `${offsetInfo.width}px`;
    this.rippleContainer.style.left = `${offsetInfo.left}px`;
    this.rippleContainer.style.top = `${offsetInfo.top}px`;
    this.rippleContainer.style.height = `${offsetInfo.height}px`;
    this.rippleContainer.className = 'ripple-container';
    this.rippleContainer.style.pointerEvents = 'none';
    this.rippleContainer.style.overflow = 'hidden';
    this.htmlElement.appendChild(this.rippleContainer);
  }

  removeContainer = () => {
    this.rippleContainer?.remove();
    this.ripple?.removeEventListener('animationend', this.removeContainer);
  };

  detaching() {
    if (!this.htmlElement) return;
    this.htmlElement.removeEventListener('mousedown', this.rippleEvent);
  }
}
