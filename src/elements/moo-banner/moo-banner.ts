import { bindable, BindingMode, containerless, ICustomElementViewModel } from 'aurelia';

import './moo-banner.scss';

import { CloseReason, MDCBanner } from '@material/banner';

@containerless()
export class MooBanner implements ICustomElementViewModel {
    @bindable primaryAction;
    @bindable secondaryAction;
    @bindable({ mode: BindingMode.twoWay }) open;
    bannerEl: HTMLButtonElement;
    banner: MDCBanner;

    attached() {
        this.banner = new MDCBanner(this.bannerEl);
        if (this.open) {
            this.banner.open();
        }
    }

    openChanged() {
        if (this.open) {
            this.banner.open();
        } else {
            this.banner.close(CloseReason.PRIMARY);
        }

    }
}
