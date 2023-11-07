import { customElement, ICustomElementViewModel } from '@aurelia/runtime-html';

import template from './moo-icon.html?raw';

@customElement({ name: 'moo-icon', template, containerless: true, capture: true })
export class MooIcon implements ICustomElementViewModel {

}
