import { customElement, ICustomElementViewModel } from '@aurelia/runtime-html';

import template from './moo-menu.html?raw';

@customElement({ name:'moo-menu', template, containerless: true, capture: true })
export class MooMenu implements ICustomElementViewModel {

}
