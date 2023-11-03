import './moo-chip.scss';
import {customElement, ICustomElementViewModel} from "@aurelia/runtime-html";

import template from './moo-chip.html?raw';
@customElement({name:'moo-chip', template, containerless: true})
export class MooChip implements ICustomElementViewModel {
}
