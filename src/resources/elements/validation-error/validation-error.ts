import { inject } from "aurelia";
import { IEventAggregator } from "aurelia";
import './validation-error.scss';

export type ServerError = {
    type: ErrorBannerTypes,
    header: string;
    errors: any[]
}

export enum ErrorBannerTypes {
    ValidationError = 0,
    GeneralError = 1
}

@inject(IEventAggregator)
export class ValidationError {
    constructor(private ea: IEventAggregator) {

    }

    errors;
    banner;
    bannerOpen;
    errorHeader = 'Validation Error';

    created() {
        const subscription = this.ea.subscribe('present-error', (data: ServerError) => {
            this.errors = data.errors;
            setTimeout(() => {
                this.bannerOpen = true;
            })
        })
    }

    getError(index) {
        return JSON.stringify(this.errors[index]);
    }
}
