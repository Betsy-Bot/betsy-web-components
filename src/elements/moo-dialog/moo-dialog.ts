import 'devextreme/dist/css/dx.material.purple.dark.compact.css';
import {bindable, customElement, ICustomElementViewModel} from 'aurelia';
import template from "./moo-dialog.html";
import {MDCDialog} from '@material/dialog';
@customElement({
    name: 'moo-dialog',
    template,
    containerless: true
})
export class MooDialog implements ICustomElementViewModel {
    dialogEl: HTMLElement;
    dialog: MDCDialog;

    attached() {
        this.dialog = new MDCDialog(this.dialogEl);
    }
}
