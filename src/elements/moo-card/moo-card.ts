import { bindable, containerless, ICustomElementViewModel } from 'aurelia';

import './moo-card.scss';


@containerless()
export class MooCard implements ICustomElementViewModel {
    @bindable outlined: boolean;
}
