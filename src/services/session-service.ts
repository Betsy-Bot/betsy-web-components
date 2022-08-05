import {inject} from 'aurelia-framework';
import {ApiService} from "./api-service";
import {DiscordService} from "./discord-service";
import {ProfileResponse} from "./models/user";
import {toast} from "lets-toast";
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(ApiService, DiscordService, EventAggregator)
export class SessionService {
    static TOKEN_KEY = 'jwt_token';
    static SIDEBAR_STATUS_KEY = 'sidebar_open';

    public currentUser;

    constructor(private apiService: ApiService, private discordService: DiscordService, private eventAggregator: EventAggregator) {
    }

    saveStorageItem(key: string, value: string) {
        window.localStorage.setItem(key, value);
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

    destroyStorageItem(key: string) {
        window.localStorage.removeItem(key);
    }

    async loginWithOAuthCode(code: string) {
        const response = await this.discordService.exchangeCode(code);

        if (response.token) {
            this.saveStorageItem(SessionService.TOKEN_KEY, response.token);
        }

        this.currentUser = response;
        this.eventAggregator.publish('user-updated', this.currentUser);
    }

    async getUser(): Promise<ProfileResponse | boolean> {
        if (this.isTokenValid()) {
            if (this.currentUser) {
                return this.currentUser;
            } else {
                return await this.refreshProfile();
            }
        } else {
            return false;
        }
    }

    async refreshProfile() {
        this.currentUser = await this.apiService.doGet('User/Profile');
        if (!this.currentUser) {
            //this.destroyStorageItem(SessionService.TOKEN_KEY);
            toast("Please re-login", {severity: "error"});
        }
        this.eventAggregator.publish('user-updated', this.currentUser);
        return this.currentUser;
    }

    isTokenValid() {
        const token = <string>this.getStorageItem(SessionService.TOKEN_KEY);
        return token && token !== '' && token !== undefined && token !== 'undefined' && token !== 'null';
    }

    hasValidSession() {
        const token = this.getStorageItem(SessionService.TOKEN_KEY);
        return token && token !== '' && token !== undefined && token !== 'undefined' && token !== 'null';
    }

    async logout() {
        this.clearSession();
    }

    clearSession() {
        this.destroyStorageItem(SessionService.TOKEN_KEY);
        this.currentUser = null;
        this.eventAggregator.publish('user-updated', null);
    }
}
