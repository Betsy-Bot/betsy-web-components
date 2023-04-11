import {bindable, customElement, ICustomElementViewModel} from 'aurelia';
import {MDCDrawer} from "@material/drawer";
import template from './moo-card.html';
import './moo-card.scss';

@customElement({
    name: 'moo-card',
    template,
    containerless: true
})
export class MooCard implements ICustomElementViewModel {
    @bindable outlined: boolean;
}
