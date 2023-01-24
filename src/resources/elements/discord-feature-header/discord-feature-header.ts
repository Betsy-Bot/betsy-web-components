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
    @bindable deleteFunction;
    @bindable copyFunction;
    banner;

    navigateBack() {
        this.router.navigateBack();
    }

    handleDelete() {
        this.deleteFunction();
    }

    handleCopy() {
        this.copyFunction();
    }

    attached() {
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
