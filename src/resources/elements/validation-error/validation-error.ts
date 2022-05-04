import {inject} from "aurelia-framework";
import {EventAggregator} from "aurelia-event-aggregator";
import './validation-error.scss';

@inject(EventAggregator)
export class ValidationError {
    constructor(private ea: EventAggregator) {

    }

    errors;
    banner;

    created() {
        let subscription = this.ea.subscribe('validation-error', (data) => {
            this.errors = data;
            console.log(this.errors);
            this.banner.open();
            this.setBannerHeight();
        })
    }

    getError(index) {
        return JSON.stringify(this.errors[index]);
    }

    setBannerHeight() {
        let height = 52;
        switch (Object.keys(this.errors).length) {
            case 1:
                height = 72;
                break;
        }
        console.log('height', height)
        this.banner.style.height = height;
    }
}
