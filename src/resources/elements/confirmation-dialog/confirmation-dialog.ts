import {bindable, BindingMode, customElement, ICustomElementViewModel} from "aurelia";
import './confirmation-dialog.scss'
import template from "./confirmation-dialog.html";

@customElement({
    name: 'confirmation-dialog',
    template: template,
    containerless: true
})
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
