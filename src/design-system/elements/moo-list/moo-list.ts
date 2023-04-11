import {customElement, ICustomElementViewModel} from 'aurelia';
import template from './moo-list.html';
import './moo-list.scss';

@customElement({
    name: 'moo-list',
    template,
    containerless: true
})
export class MooList implements ICustomElementViewModel {

}
