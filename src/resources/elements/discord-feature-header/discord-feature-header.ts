import {bindable, inject} from "aurelia-framework";
import {Router} from "aurelia-router";
import './discord-feature-header.scss';

@inject(Router)
export class DiscordFeatureHeader {
    constructor(private router: Router) {
    }

    @bindable title;
    @bindable subtitle;
    @bindable hideBack;
    @bindable docUrl;
    @bindable displayWarning;
    banner;

    navigateBack() {
        this.router.navigateBack();
    }

    attached() {
        console.log(this.displayWarning)
        if (this.displayWarning) {
            setTimeout(() => {
                this.banner.open();
            })
        } else {
            setTimeout(() => {
                this.banner.close();
            })
        }
    }
}
