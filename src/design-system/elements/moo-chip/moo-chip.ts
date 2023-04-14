import { customElement, ICustomElementViewModel } from 'aurelia';

import template from './moo-chip.html';

import './moo-chip.scss';


@customElement({
    name: 'moo-chip',
    template,
    containerless: true
})
export class MooChip implements ICustomElementViewModel {

}
