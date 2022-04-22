import {bindable} from "aurelia-framework";
import './confirmation-dialog.scss'

export class ConfirmationDialog {
    @bindable handler;
    @bindable cancelText;
    @bindable confirmText;
    @bindable dialog;
    @bindable title;

    handleClosing(event) {
        this.handler({event: event});
    }
}
