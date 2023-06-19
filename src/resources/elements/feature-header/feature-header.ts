import { bindable, capture, containerless, ICustomElementViewModel } from "aurelia";

import "./feature-header.scss";

@containerless()
@capture()
export class FeatureHeader implements ICustomElementViewModel {
    @bindable title;
    @bindable subtitle;
    @bindable hideBack;
    @bindable docUrl;
    @bindable displayWarning;
    @bindable deleteFunction: () => void;
    @bindable copyFunction: () => void;
    @bindable createFunction: () => void;
    @bindable saveFunction: () => void;
    @bindable createRoute: string;
    bannerOpen: boolean;

    bound() {
        this.bannerOpen = !!this.displayWarning;
    }
}
