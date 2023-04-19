import { inject } from "aurelia";
import { IEventAggregator } from "aurelia";
import "./error-banner.scss";

export type ServerError = {
    type: ErrorBannerTypes;
    header: string;
    subheader: string;
    errors: any[];
    error: string;
    details: string;
};

export enum ErrorBannerTypes {
    ValidationError = 0,
    GeneralError = 1,
}

@inject(IEventAggregator)
export class ErrorBanner {
    constructor(private ea: IEventAggregator) {}

    errors;
    banner;
    bannerOpen;
    errorHeader = "Validation Error";
    errorSubheader: string;
    details: string;
    error: string;

    created() {
        const subscription = this.ea.subscribe(
            "present-error",
            (data: ServerError) => {
                this.errors = data.errors;
                this.errorHeader = data.header ?? this.errorHeader;
                this.errorSubheader = data.subheader;
                this.error = data.error;
                this.details = data.details;
                setTimeout(() => {
                    this.bannerOpen = true;
                });
            }
        );
    }

    getError(index) {
        return JSON.stringify(this.errors[index]);
    }
}
