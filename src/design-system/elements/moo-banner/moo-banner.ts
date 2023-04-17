import {bindable, BindingMode, customElement, ICustomElementViewModel} from 'aurelia';
import {CloseReason, MDCBanner} from '@material/banner';
import template from './moo-banner.html';
import './moo-banner.scss';

@customElement({
    name: 'moo-banner',
    template,
})
export class MooBanner implements ICustomElementViewModel {
    @bindable primaryAction;
    @bindable secondaryAction;
    @bindable({mode: BindingMode.twoWay}) open;
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
