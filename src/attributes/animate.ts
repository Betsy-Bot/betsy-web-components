import { bindable, customAttribute, ICustomAttributeViewModel, INode } from 'aurelia';

import { easings, IAnimationService } from '../services';

@customAttribute({ name: 'animate' })
export class AnimateAttribute implements ICustomAttributeViewModel {
  @bindable public value?: string;
  @bindable public from?: number;
  @bindable public to?: number;
  @bindable public unit?: string;
  @bindable public duration?: number;
  @bindable public easing?: string | null;
  @bindable public out?: boolean;
  @bindable public startClass?: string | null;
  @bindable public endClass?: string | null;
  @bindable public reverse?: boolean;
  @bindable public animationStarted?: boolean;
  @bindable public speed?: number;
  resolve?: (value: void | PromiseLike<void>) => void;

  constructor(@INode private readonly element: HTMLElement, @IAnimationService private readonly animationService: IAnimationService) {}

  binding(): void | Promise<void> {
    const duration = this.element.getAttribute('animate-duration');
    this.from ??= Number(this.element.getAttribute('animate-from'));
    this.reverse ??= this.element.getAttribute('animate-reverse') != null;
    this.to ??= Number(this.element.getAttribute('animate-to'));
    this.speed ??= Number(this.element.getAttribute('animate-speed'));
    this.unit ??= this.element.getAttribute('animate-unit') ?? 'px';
    this.duration ??= duration ? Number(duration) : 1000;
    this.easing ??= this.element.getAttribute('animate-easing');
    this.out ??= Boolean(this.element.getAttribute('animate-out'));
    this.startClass ??= this.element.getAttribute('animate-start-class');
    this.endClass ??= this.element.getAttribute('animate-end-class');
  }

  attached(): void | Promise<void> {
    if (this.startClass) {
      this.element.onanimationend = this.onAnimationEnd;
      this.element.onanimationstart = (): boolean => (this.animationStarted = true);
      this.element.classList.add(this.startClass);
      if (this.speed) this.element.style.animationDuration = `${this.speed}s`;
      return;
    }

    if (this.value && this.from == null) {
      this.element.onanimationend = this.onAnimationEnd;
      this.element.onanimationstart = (): boolean => (this.animationStarted = true);
      this.element.classList.add(this.value);
      return;
    }

    this.value &&
      this.from != null &&
      this.to != null &&
      this.duration &&
      this.animationService.animateCSS(this.element, this.value, 'px', this.from, this.to, this.duration, this.easing as keyof typeof easings);
  }

  onAnimationEnd = (): void => {
    this.startClass && this.element.classList.remove(this.startClass);
    this.endClass && this.element.classList.remove(this.endClass);
    this.resolve?.();
  };

  detaching(): void | Promise<void> {
    return new Promise((res) => {
      this.resolve = res;

      if (this.out && this.value && this.to != null && this.from != null && this.duration) {
        this.animationService.animateCSS(this.element, this.value, 'px', this.to, this.from, this.duration, this.easing as keyof typeof easings, () => this.resolve?.());
        return;
      }

      if (this.endClass) {
        this.element.classList.add(this.endClass);
        this.element.onanimationend = this.onAnimationEnd;
      }
      if (this.reverse) {
        this.element.style.animationDirection = 'reverse';
        this.element.onanimationend = this.onAnimationEnd;
      }

      if (this.value && this.from == null) {
        this.element.onanimationend = this.onAnimationEnd;
        this.element.classList.add(this.value);
        this.element.style.animationDirection = 'reverse';
        return;
      }

      // not started or no end class
      if (!this.animationStarted || !this.endClass) {
        this.resolve();
      }
    });
  }
}
