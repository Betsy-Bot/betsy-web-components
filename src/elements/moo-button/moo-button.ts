import { bindable, customElement, ICustomElementViewModel } from '@aurelia/runtime-html';

import '@material/web/icon/icon.js';
import '@material/web/button/elevated-button.js';
import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/button/text-button.js';
import '@material/web/button/filled-tonal-button.js';

export type MOO_BUTTON_MD_TYPE = 'filled' | 'outlined' | 'text' | 'elevated';
import template from './moo-button.html?raw';

@customElement({ name: 'moo-button', template, containerless: true, capture: true })
export class MooButton implements ICustomElementViewModel {
    button: HTMLButtonElement;
    @bindable label: string;
    @bindable mdType: MOO_BUTTON_MD_TYPE = 'filled';
    @bindable icon: string;
    @bindable click: () => void;
    @bindable dataMdcDialogAction;
    @bindable disabled = false;
}
