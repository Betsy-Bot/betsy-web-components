import {bindable, inject} from "aurelia-framework";
import {Router} from "aurelia-router";

@inject(Router)
export class DiscordFeatureHeader {
    constructor(private router: Router) {
    }

    @bindable title;
    @bindable subtitle;
    @bindable hideBack;
    @bindable docUrl;

    navigateBack() {
        this.router.navigateBack();
    }
}
