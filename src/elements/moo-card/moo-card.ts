import './moo-card.scss';
import {bindable, containerless, ICustomElementViewModel} from "@aurelia/runtime-html";

export class MooCard implements ICustomElementViewModel {
    static containerless = true;
    @bindable outlined: boolean;
}
