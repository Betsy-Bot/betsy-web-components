import {
    bindable,
    BindingMode,
    customElement,
    ICustomElementViewModel,
} from "aurelia";

import template from "./moo-menu.html";

import "./moo-menu.scss";

import { MDCMenu } from "@material/menu";

@customElement({
    name: "moo-menu",
    template,
    containerless: true,
})
export class MooMenu implements ICustomElementViewModel {
    @bindable open = false;
    menuEl: HTMLElement;
    menu: MDCMenu;

    attached() {
        this.menu = new MDCMenu(this.menuEl);
        this.menu.open = this.open;
    }

    openChanged() {
        if (this.menu) {
            this.menu.open = this.open;
        }
    }
}
