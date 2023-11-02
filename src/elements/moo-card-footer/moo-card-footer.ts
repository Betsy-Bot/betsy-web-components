import {bindable, customElement, ICustomElementViewModel} from "@aurelia/runtime-html";

import template from './moo-card-footer.html?raw';
@customElement({name:'moo-card-footer', template, containerless: true})
export class MooCardFooter implements ICustomElementViewModel {
    @bindable outlined: boolean;
}
