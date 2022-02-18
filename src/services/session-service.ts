import { inject, EventAggregator } from 'aurelia';
import { ApiService } from "./api-service";
import { DiscordService } from "./discord-service";
import {ProfileResponse} from "./models/user";

@inject(ApiService, DiscordService, EventAggregator)
export class SessionService {
    static TOKEN_KEY = 'jwt_token';

    public currentUser;

    constructor(private apiService: ApiService, private discordService: DiscordService, private eventAggregator: EventAggregator) {
    }

    saveStorageItem(key: string, value: string) {
        window.localStorage[key] = value;
    }

    getStorageItem(key: string): string {
        return window.localStorage[key];
    }

    destroyStorageItem(key: string) {
        window.localStorage.removeItem(key);
    }

    async loginWithOAuthCode(code: string) {
        const response = await this.discordService.exchangeCode(code);

        if (response.token) {
            this.saveStorageItem(SessionService.TOKEN_KEY, response.token);
        }
        console.log(response);

        this.currentUser = response;
        this.eventAggregator.publish('user-updated', this.currentUser);
    }

    async getUser(): Promise<ProfileResponse> {
        if (this.isTokenValid()) {
            if (this.currentUser) {
                return this.currentUser;
            } else {
                return await this.refreshProfile();
            }
        }
    }

    async refreshProfile() {
        this.currentUser = await this.apiService.doGet('User/Profile');

        this.eventAggregator.publish('user-updated', this.currentUser);

        return this.currentUser;
    }

    isTokenValid() {
        const token = this.getStorageItem(SessionService.TOKEN_KEY);
        if (token && token !== '' && token !== undefined && token !== 'undefined') {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            if(JSON.parse(jsonPayload).exp * 1000 <= Date.now()) {
                this.clearSession();
                return false
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    async logout() {
        try {
            await this.apiService.doDelete('Logout');
        } finally {
            this.clearSession();
        }
    }

    clearSession() {
        this.destroyStorageItem(SessionService.TOKEN_KEY);
        this.currentUser = null;
        this.eventAggregator.publish('user-updated', {});
    }
}
