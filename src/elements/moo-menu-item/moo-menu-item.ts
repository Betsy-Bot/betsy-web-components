import { customElement, ICustomElementViewModel } from '@aurelia/runtime-html';

import template from './moo-menu-item.html?raw';

@customElement({ name:'moo-menu-item', template, containerless: true, capture: true })
export class MooMenuItem implements ICustomElementViewModel {

}
