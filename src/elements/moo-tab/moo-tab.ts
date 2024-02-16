import {bindable, customElement, ICustomElementViewModel} from '@aurelia/runtime-html';

import template from './moo-tab.html?raw';

export type MOO_TAB_VARIANT = 'primary' | 'secondary';
@customElement({ name:'moo-tab', template, containerless: true, capture: true })
export class MooTab implements ICustomElementViewModel {
    @bindable variant: MOO_TAB_VARIANT = 'primary';
}
