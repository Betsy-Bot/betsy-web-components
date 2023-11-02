import './moo-card.scss';
import {bindable, customElement, ICustomElementViewModel} from "@aurelia/runtime-html";

import template from './moo-card.html?raw';
@customElement({name:'moo-banner', template, containerless: true})
export class MooCard implements ICustomElementViewModel {
    @bindable outlined: boolean;
}
