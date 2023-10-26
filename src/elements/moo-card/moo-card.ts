import './moo-card.scss';
import {bindable, containerless, ICustomElementViewModel} from "@aurelia/runtime-html";

@containerless()
export class MooCard implements ICustomElementViewModel {
    @bindable outlined: boolean;
}
