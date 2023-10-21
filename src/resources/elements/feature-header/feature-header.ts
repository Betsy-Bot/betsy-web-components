import { bindable, BindingMode, capture, containerless, ICustomElementViewModel } from 'aurelia';

import './feature-header.scss';

@containerless()
@capture()
export class FeatureHeader implements ICustomElementViewModel {
    @bindable title: string;
    @bindable subtitle: string;
    @bindable hideBack: boolean;
    @bindable docUrl: string;
    @bindable displayWarning: boolean;
    @bindable deleteFunction: () => void;
    @bindable copyFunction: () => void;
    @bindable createFunction: () => void;
    @bindable saveFunction: () => void;
    @bindable toggleFunction: () => void;
    @bindable createRoute: string;
    @bindable includeToggle: boolean;
    @bindable({ mode: BindingMode.twoWay }) featureActive: boolean;
    bannerOpen: boolean;

    bound() {
        this.bannerOpen = this.displayWarning;
    }
}
