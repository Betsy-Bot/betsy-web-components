import {bindable, inject} from "aurelia-framework";
import {Router} from "aurelia-router";

@inject(Router)
export class DiscordFeatureHeader {
    constructor(private router: Router) {
    }
    @bindable title;
    @bindable subtitle;


    navigateBack() {
        this.router.navigateBack();
    }
}
