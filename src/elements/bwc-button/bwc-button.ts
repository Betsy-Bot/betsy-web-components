import { customElement, ICustomElementViewModel, shadowCSS } from 'aurelia';

import template from './bwc-button.html';
import css from './bwc-button.scss?inline';

@customElement({
  name: 'bwc-button',
  template,
  dependencies: [shadowCSS(css)],
  shadowOptions: {
    mode: 'open',
  },
})
export class BwcButton implements ICustomElementViewModel {

}
