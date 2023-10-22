import {
    bindable,
    BindingMode, containerless,
    ICustomElementViewModel,
} from 'aurelia';

import 'devextreme/dist/css/dx.material.purple.dark.compact.css';
import './moo-dialog.scss';

import { MDCDialog, MDCDialogCloseEvent } from '@material/dialog';
@containerless()
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
