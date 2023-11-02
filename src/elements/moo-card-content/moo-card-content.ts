import {bindable, customElement, ICustomElementViewModel} from "@aurelia/runtime-html";

import template from './moo-card-content.html?raw';
@customElement({name:'moo-card-content', template, containerless: true})
export class MooCardContent implements ICustomElementViewModel {
    @bindable outlined: boolean;
}
