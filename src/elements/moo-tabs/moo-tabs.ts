import { customElement, ICustomElementViewModel } from '@aurelia/runtime-html';

import template from './moo-tabs.html?raw';
@customElement({ name:'moo-tabs', template, containerless: true, capture: true })
export class MooTabs implements ICustomElementViewModel {

}
