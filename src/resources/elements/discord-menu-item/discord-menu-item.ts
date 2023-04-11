import { bindable } from "aurelia";

export class DiscordMenuItem {
    @bindable item;
    @bindable index;
    @bindable removeFunction;

    removeItem() {
        this.removeFunction();
    }
}
