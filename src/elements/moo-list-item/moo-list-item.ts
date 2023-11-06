import { bindable, customElement, ICustomElementViewModel } from '@aurelia/runtime-html';

import template from './moo-list-item.html?raw';
@customElement({ name:'moo-list-item', template, containerless: true })
export class MooListItem implements ICustomElementViewModel {
    @bindable route: string;
}
