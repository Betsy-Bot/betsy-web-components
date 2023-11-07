import {bindable, customElement, ICustomElementViewModel} from '@aurelia/runtime-html';

import template from './moo-fab.html?raw';

export type MOO_FAB_VARIANT = 'primary' | 'secondary' | 'tertiary';

@customElement({ name: 'moo-fab', template, containerless: true, capture: true })
export class MooFab implements ICustomElementViewModel {
    @bindable url: string;
    @bindable variant: MOO_FAB_VARIANT;
    @bindable label: string;
}
