import { customElement, ICustomElementViewModel } from '@aurelia/runtime-html';

import template from './moo-list.html?raw';

@customElement({ name:'moo-list', template, containerless: true, capture: true })
export class MooList implements ICustomElementViewModel {
}
