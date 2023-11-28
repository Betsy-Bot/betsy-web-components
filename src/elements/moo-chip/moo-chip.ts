import {bindable, customElement, ICustomElementViewModel} from "@aurelia/runtime-html";

export type MOO_CHIP_SET_VARIANT = 'assist' | 'filter' | 'input' | 'suggestion';
import template from './moo-chip.html?raw';
@customElement({name:'moo-chip', template, containerless: true, capture: true})
export class MooChip implements ICustomElementViewModel {
    @bindable variant: MOO_CHIP_SET_VARIANT = 'assist';
}
