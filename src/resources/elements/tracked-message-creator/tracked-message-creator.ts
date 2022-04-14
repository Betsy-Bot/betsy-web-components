import {bindable} from "aurelia-framework";

export class TrackedMessageCreator {
    @bindable request;
    @bindable guildId;
    @bindable allowComponents;
    @bindable maxComponents;
}
