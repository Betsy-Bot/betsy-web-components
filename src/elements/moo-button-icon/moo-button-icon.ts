import { customElement, ICustomElementViewModel } from '@aurelia/runtime-html';

import template from './moo-button-icon.html?raw';

@customElement({ name: 'moo-button-icon', template, containerless: true, capture: true })
export class MooButtonIcon implements ICustomElementViewModel {

}
