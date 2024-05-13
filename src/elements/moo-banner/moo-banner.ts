import './moo-banner.scss';

import { CloseReason, MDCBanner } from '@material/banner';
import {bindable, BindingMode, customElement, ICustomElementViewModel, watch} from "@aurelia/runtime-html";

import template from './moo-banner.html?raw';
@customElement({name:'moo-banner', template, containerless: true, capture: true})
export class MooBanner implements ICustomElementViewModel {
    @bindable primaryAction: string;
    @bindable secondaryAction: string;
    @bindable({ mode: BindingMode.twoWay }) open: boolean;
    bannerEl: HTMLButtonElement;
    banner: MDCBanner;

    attached() {
        this.banner = new MDCBanner(this.bannerEl);
        if (this.open) {
            this.banner.open();
        }
    }

    @watch('open')
    openChanged() {
        if (this.open) {
            this.banner.open();
        } else {
            this.banner.close(CloseReason.PRIMARY);
        }
    }
}
