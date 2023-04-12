import 'devextreme/dist/css/dx.material.purple.dark.compact.css';
import {bindable, BindingMode, customElement, ICustomElementViewModel} from 'aurelia';
import template from "./moo-dialog.html";
import {MDCDialog} from '@material/dialog';
import './moo-dialog.scss';
@customElement({
    name: 'moo-dialog',
    template,
    containerless: true
})
export class MooDialog implements ICustomElementViewModel {
    @bindable dialogEl: HTMLElement;
    @bindable({ mode: BindingMode.twoWay }) dialog: MDCDialog;

    attached() {
        this.dialog = new MDCDialog(this.dialogEl);
        console.log(this.dialog);
    }
}
