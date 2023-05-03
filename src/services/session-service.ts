import { inject } from 'aurelia';
import { IEventAggregator } from 'aurelia';

import { ExchangeCodeResponse } from "./models/discord";
import { ProfileResponse } from "./models/user";
import { ApiService } from "./api-service";
import { DiscordService } from "./discord-service";

import { toast } from "lets-toast";

@inject(ApiService, DiscordService, IEventAggregator)
export class SessionService {
    public static TOKEN_KEY = 'jwt_token';
    public static SIDEBAR_STATUS_KEY = 'sidebar_open';

    public currentUser: ProfileResponse | ExchangeCodeResponse;

    constructor(private apiService: ApiService, private discordService: DiscordService, private eventAggregator: IEventAggregator) {
    }

    public saveStorageItem(key: string, value: string) {
        window.localStorage.setItem(key, value);
    }

    public getStorageItem(key: string, defaultValue: any = null): string | boolean {
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

    public destroyStorageItem(key: string) {
        window.localStorage.removeItem(key);
    }

    public async loginWithOAuthCode(code: string, redirectUrl?: string) {
        const response = await this.discordService.exchangeCode(code, redirectUrl);

        if (response.token) {
            this.saveStorageItem(SessionService.TOKEN_KEY, response.token);
        }

        this.currentUser = response;
        this.eventAggregator.publish('user-updated', this.currentUser);
        return response;
    }

    public async getUser(): Promise<ProfileResponse | ExchangeCodeResponse  | boolean> {
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

    public async refreshProfile() {
        this.currentUser = await this.apiService.doGet('User/Profile');
        if (!this.currentUser) {
            //this.destroyStorageItem(SessionService.TOKEN_KEY);
            toast("Please re-login", { severity: "error" });
        }
        this.eventAggregator.publish('user-updated', this.currentUser);
        return this.currentUser;
    }

    public isTokenValid() {
        const token = this.getStorageItem(SessionService.TOKEN_KEY) as string;
        return token && token !== '' && token !== undefined && token !== 'undefined' && token !== 'null';
    }

    public hasValidSession() {
        const token = this.getStorageItem(SessionService.TOKEN_KEY);
        return token && token !== '' && token !== undefined && token !== 'undefined' && token !== 'null';
    }

    public logout() {
        this.clearSession();
    }

    public clearSession() {
        this.destroyStorageItem(SessionService.TOKEN_KEY);
        this.currentUser = null;
        this.eventAggregator.publish('user-updated', null);
    }

    public async isAdmin(guildId): Promise<boolean> {
        const user = await this.getUser();
        if (!user) return;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        for (const server of user.activeServers) {
            if (server.guildId == guildId) return true;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            if (server.ownerId == user.id) return true;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        for (const server of user.adminedServers) {
            if (server.guildId == guildId) return true;
        }
        return false
    }
}
