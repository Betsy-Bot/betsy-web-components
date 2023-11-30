import { bindable, customElement, ICustomElementViewModel } from '@aurelia/runtime-html';

import template from './moo-progress.html?raw';

export type MOO_PROGRESS_VARIANT = 'linear' | 'circular';
@customElement({ name:'moo-progress', template, containerless: true, capture: true })
export class MooProgress implements ICustomElementViewModel {
    @bindable variant: MOO_PROGRESS_VARIANT = 'circular';
}
