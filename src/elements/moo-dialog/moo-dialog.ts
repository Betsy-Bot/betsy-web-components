import './moo-dialog.scss';

import { MDCDialog, MDCDialogCloseEvent } from '@material/dialog';
import {bindable, BindingMode, customElement, ICustomElementViewModel} from "@aurelia/runtime-html";

import template from './moo-dialog.html?raw';
@customElement({name:'moo-dialog', template, containerless: true})
export class MooDialog implements ICustomElementViewModel {
    @bindable dialogEl: HTMLElement;
    @bindable({ mode: BindingMode.twoWay }) dialog: MDCDialog;
    @bindable handler?: (Event) => void;
    @bindable title: string;

    attached() {
        this.dialog = new MDCDialog(this.dialogEl);
        this.dialog.listen('MDCDialog:closed', (e: MDCDialogCloseEvent) => {
            if (this.handler) {
                this.handler(e);
            }
        });
    }
}
