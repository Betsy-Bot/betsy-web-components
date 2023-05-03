import {
    bindable,
    BindingMode, containerless,
    ICustomElementViewModel,
} from "aurelia";

import "devextreme/dist/css/dx.material.purple.dark.compact.css";
import "./moo-dialog.scss";

import { MDCDialog } from "@material/dialog";
@containerless()
export class MooDialog implements ICustomElementViewModel {
    @bindable dialogEl: HTMLElement;
    @bindable({ mode: BindingMode.twoWay }) dialog: MDCDialog;
    @bindable handler;

    attached() {
        this.dialog = new MDCDialog(this.dialogEl);
        this.dialog.listen("MDCDialog:closed", (e) => {
            if (this.handler) {
                this.handler(e);
            }
        });
    }
}
