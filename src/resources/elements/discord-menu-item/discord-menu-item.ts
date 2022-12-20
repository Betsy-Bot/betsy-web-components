import { bindable } from "aurelia-framework";

export class DiscordMenuItem {
    @bindable item;
    @bindable index;
    @bindable removeFunction;

    removeItem() {
        this.removeFunction();
    }
}
