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
            setTimeout(() => {
                this.banner.open();
            })
        })
    }

    getError(index) {
        return JSON.stringify(this.errors[index]);
    }
}
