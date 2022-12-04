import {inject} from 'aurelia-framework';
import {SessionService} from './session-service';
import {toast} from "lets-toast";
import {EventAggregator} from "aurelia-event-aggregator";

const AUTHORIZATION_HEADER = 'Authorization';

@inject(SessionService, EventAggregator)
export class ApiInterceptor {
    constructor(private sessionService: SessionService, private ea: EventAggregator) {
    }

    request(request) {
        try {
            if (!this.sessionService.hasValidSession()) {
                return request;
            }

            if (!request.headers.get(AUTHORIZATION_HEADER)) {
                const bearerToken = `Bearer ${this.sessionService.getStorageItem(SessionService.TOKEN_KEY)}`;
                request.headers.append(AUTHORIZATION_HEADER, bearerToken);
            }

            return request;
        } catch (e) {
            console.log(e);
            //this.notification.error('Something went wrong. If this error continues, please contact support.', 'Error');
        }
    }

    async response(response) {
        try {
            let data;
            let err;
            let msg;
            switch (response?.status) {
                case 401:
                    await this.sessionService.clearSession();
                    break;
                case 403:
                    try {
                        data = await response.json();
                        if (data.message == "Expired Token? Please relog") {
                            toast("Discord Token Expired. Please Login Again", {severity: "error"});
                            await this.sessionService.clearSession();
                        }
                    } catch(e) {
                        console.log(e);
                    }
                    break;
                case 404:
                    return null;
                case 400:
                    data = await response.json();
                    toast(data?.message, {severity: "error"});
                    break;
                case 422:
                    data = await response.json();
                    this.ea.publish('validation-error', data.validationErrors);
                    toast("Validation Error!", {severity: "error"});
                    break;
                case 500:
                    data = await response.json();
                    break;
            }
            return response;
        } catch (e) {
            console.log(e);
            //this.notification.error('Something went wrong. If this error continues, please contact support.', 'Error');
        }
    }
}
