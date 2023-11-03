import './moo-button.scss';
import {bindable, customElement, ICustomElementViewModel} from "@aurelia/runtime-html";

export type MOO_BUTTON_VARIANT = 'primary' | 'secondary';
import template from './moo-button.html?raw';

@customElement({name:'moo-button', template, containerless: true})
export class MooButton implements ICustomElementViewModel {
    button: HTMLButtonElement;
    @bindable label: string;
    @bindable type: string;
    @bindable icon: string;
    @bindable variant: MOO_BUTTON_VARIANT = 'primary';
    @bindable class = '';
    @bindable click: () => void;
    @bindable dataMdcDialogAction;
    @bindable disabled = false;

    get colorClass() {
        switch (this.variant) {
            case 'primary':
                return '';
            case 'secondary':
                return 'moo-button-secondary';
        }
    }

    handleClick() {
        if (this.click) {
            this.click();
        }
    }

    get hasClickFunction() {
        return typeof this.click === 'function';
    }
}
