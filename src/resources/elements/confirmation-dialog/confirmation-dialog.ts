import {bindable} from "aurelia-framework";

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
