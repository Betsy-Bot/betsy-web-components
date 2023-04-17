import { bindable } from 'aurelia';

import { numberToPixelsInterceptor } from '../common';

import { Alignable } from './alignable';

export abstract class Grid extends Alignable {
  @bindable({ set: numberToPixelsInterceptor }) gap?: string;
  @bindable({ set: numberToPixelsInterceptor }) rowGap?: string;
  @bindable({ set: numberToPixelsInterceptor }) columnGap?: string;

  get gridStyle(): Record<string, string | undefined> {
    return {
      gap: this.gap,
      rowGap: this.rowGap,
      columnGap: this.columnGap,
      ...this.alignableStyle,
    };
  }
}
