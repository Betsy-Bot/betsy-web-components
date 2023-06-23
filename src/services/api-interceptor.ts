import { inject } from "aurelia";
import { IEventAggregator } from "aurelia";

import { SessionService } from "./session-service";

import { toast } from "lets-toast";

const AUTHORIZATION_HEADER = "Authorization";
const GUILD_ID_HEADER = "Discord-Guild-Id";

@inject(IEventAggregator)
export class ApiInterceptor {
    guildId;
    constructor(private ea: IEventAggregator) {
        this.ea.subscribe("guild-updated", (payload) => {
            this.guildId = payload as number;
        });
    }

    request(request) {
        try {
            if (!this.hasValidSession()) {
                return request;
            }

            if (!request.headers.get(AUTHORIZATION_HEADER)) {
                const bearerToken = `Bearer ${this.getStorageItem(
                    SessionService.TOKEN_KEY
                )}`;
                request.headers.append(AUTHORIZATION_HEADER, bearerToken);
            }

            if (this.guildId) {
                request.headers.append(GUILD_ID_HEADER, this.guildId);
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
            switch (response?.status) {
                case 400:
                    data = await response.json();
                    this.ea.publish("present-error", {
                        error: data.message,
                        header: "Unexpected Error",
                        details: data.details,
                        subheader: "Please report this to Betsy Support Server",
                    });
                    break;
                case 401:
                    this.ea.publish("present-error", {
                        header: "Unauthorized",
                        subheader: "You don't have access to this resource",
                    });
                    break;
                case 403:
                    try {
                        data = await response.json();
                        if (data.message == "Expired Token? Please relog") {
                            toast("Discord Token Expired. Please Login Again", {
                                severity: "error",
                            });
                            await this.clearSession();
                        }
                    } catch (e) {
                        console.log(e);
                    }
                    break;
                case 404:
                    return null;
                case 422:
                    data = await response.json();
                    this.ea.publish("present-error", {
                        errors: data.validationErrors,
                    });
                    toast("Error!", { severity: "error" });
                    break;
                case 412:
                    data = await response.json();
                    this.ea.publish("present-error", {
                        error: data.message,
                        header: "Server Configuration Error",
                        subheader:
                            "Please talk to your server admin to resolve.",
                    });
                case 500:
                    data = await response.json();
                    this.ea.publish("present-error", {
                        error: data.message,
                        details: data.details,
                        header: "Server Error",
                        subheader:
                            "Please create a bug report and include the details below.",
                    });
                    break;
            }
            return response;
        } catch (e) {
            console.log(e);
            //this.notification.error('Something went wrong. If this error continues, please contact support.', 'Error');
        }
    }

    getStorageItem(key: string, defaultValue: any = null): string | boolean {
        if (window.localStorage[key] !== undefined) {
            try {
                return JSON.parse(window.localStorage.getItem(key));
            } catch (e) {
                return window.localStorage.getItem(key);
            }
        } else {
            this.saveStorageItem(key, defaultValue);
            return defaultValue;
        }
    }

    saveStorageItem(key: string, value: string) {
        window.localStorage.setItem(key, value);
    }

    hasValidSession() {
        const token = this.getStorageItem(SessionService.TOKEN_KEY);
        return (
            token &&
            token !== "" &&
            token !== undefined &&
            token !== "undefined" &&
            token !== "null"
        );
    }
    clearSession() {
        this.destroyStorageItem(SessionService.TOKEN_KEY);
        this.ea.publish("user-updated", null);
    }
    destroyStorageItem(key: string) {
        window.localStorage.removeItem(key);
    }
}
