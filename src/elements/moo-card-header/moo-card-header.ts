import {bindable, customElement, ICustomElementViewModel} from "@aurelia/runtime-html";

import template from './moo-card-header.html?raw';
@customElement({name:'moo-card-header', template, containerless: true})
export class MooCardHeader implements ICustomElementViewModel {
    @bindable outlined: boolean;
}
