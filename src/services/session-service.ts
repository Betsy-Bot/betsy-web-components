import { inject, EventAggregator } from 'aurelia';
import { ApiService } from "./api-service";
import { DiscordService } from "./discord-service";

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

    async getProfile() {
        if (this.isTokenValid()) {
            if (this.currentUser) {
                return this.currentUser;
            }
            // this.currentUser = await this.apiService.doGet('profile');
            return this.currentUser;
        }
    }

    async refreshProfile() {
        if (this.isTokenValid()) {
            this.currentUser = await this.apiService.doGet('profile');
            if (!this.currentUser?.isDeleted) {
                return this.currentUser;
            } else if (this.currentUser?.isDeleted) {
                await this.logout();
            }
            return this.currentUser;
        }
    }

    isTokenValid() {
        const token = this.getStorageItem(SessionService.TOKEN_KEY);
        return token && token !== '' && token !== undefined && token !== 'undefined';
    }

    async logout() {
        try {
            await this.apiService.doDelete('Logout');
        } finally {
            this.destroyStorageItem(SessionService.TOKEN_KEY);
            this.currentUser = null;
            this.eventAggregator.publish('user-updated', {});
        }
    }

    clearSession() {
        this.destroyStorageItem(SessionService.TOKEN_KEY);
        this.currentUser = null;
        this.eventAggregator.publish('user-updated', {});
    }
}
