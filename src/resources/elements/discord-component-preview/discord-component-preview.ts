import {bindable} from "aurelia-framework";

export class DiscordComponentPreview {
    @bindable components;

    attached() {
        console.log(this.components);
    }
}
