import {
    bindable,
    BindingMode,
    containerless,
    ICustomElementViewModel,
} from 'aurelia';

import './confirmation-dialog.scss';

import { MDCDialogCloseEvent } from '@material/dialog';

@containerless()
export class ConfirmationDialog implements ICustomElementViewModel {
    @bindable handler: (MDCDialogCloseEvent) => void;
    @bindable cancelText: string;
    @bindable confirmText: string;
    @bindable({ mode: BindingMode.twoWay }) dialog;
    @bindable title: string;

    handleClosing(event: MDCDialogCloseEvent) {
        this.handler(event);
    }
}
