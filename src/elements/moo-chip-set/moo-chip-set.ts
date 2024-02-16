import {customElement, ICustomElementViewModel} from "@aurelia/runtime-html";

import template from './moo-chip-set.html?raw';
@customElement({name:'moo-chip-set', template, containerless: true, capture: true})
export class MooChipSet implements ICustomElementViewModel {
}
