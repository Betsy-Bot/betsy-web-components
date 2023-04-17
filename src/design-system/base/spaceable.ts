import { bindable } from 'aurelia';

import { numberToPixelsInterceptor } from '../common';

export abstract class Spaceable {
  @bindable({ set: numberToPixelsInterceptor }) padding?: CSSStyleDeclaration['padding'];
  @bindable({ set: numberToPixelsInterceptor }) paddingLeft?: CSSStyleDeclaration['paddingLeft'];
  @bindable({ set: numberToPixelsInterceptor }) paddingRight?: CSSStyleDeclaration['paddingRight'];
  @bindable({ set: numberToPixelsInterceptor }) paddingTop?: CSSStyleDeclaration['paddingTop'];

  @bindable({ set: numberToPixelsInterceptor }) margin?: CSSStyleDeclaration['margin'];
  @bindable({ set: numberToPixelsInterceptor }) marginLeft?: CSSStyleDeclaration['marginLeft'];
  @bindable({ set: numberToPixelsInterceptor }) marginRight?: CSSStyleDeclaration['marginRight'];
  @bindable({ set: numberToPixelsInterceptor }) marginTop?: CSSStyleDeclaration['marginTop'];

  get spaceStyle(): Record<string, string | undefined> {
    return {
      padding: this.padding,
      paddingLeft: this.paddingLeft,
      paddingRight: this.paddingRight,
      paddingTop: this.paddingTop,
      margin: this.margin,
      marginLeft: this.marginLeft,
      marginRight: this.marginRight,
      marginTop: this.marginTop,
    };
  }
}
