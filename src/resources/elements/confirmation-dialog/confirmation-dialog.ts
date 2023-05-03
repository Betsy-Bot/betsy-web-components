import { bindable, BindingMode, containerless, ICustomElementViewModel } from "aurelia";

import './confirmation-dialog.scss'

@containerless()
export class ConfirmationDialog implements ICustomElementViewModel {
    @bindable handler;
    @bindable cancelText;
    @bindable confirmText;
    @bindable({ mode: BindingMode.twoWay }) dialog;
    @bindable title;

    handleClosing(event) {
        this.handler(event);
    }
}
