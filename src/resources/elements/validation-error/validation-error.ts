import { inject } from "aurelia";
import { IEventAggregator } from "aurelia";
import './validation-error.scss';

@inject(IEventAggregator)
export class ValidationError {
    constructor(private ea: IEventAggregator) {

    }

    errors;
    banner;
    bannerOpen;

    created() {
        const subscription = this.ea.subscribe('validation-error', (data) => {
            this.errors = data;
            setTimeout(() => {
                this.bannerOpen = true;
            })
        })
    }

    getError(index) {
        return JSON.stringify(this.errors[index]);
    }
}
