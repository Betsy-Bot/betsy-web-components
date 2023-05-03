import {
    bindable,
    customElement,
    ICustomElementViewModel,
    inject,
} from "aurelia";
import { IEventAggregator } from "aurelia";
import { IRouter } from "@aurelia/router-lite";

import { botClientId,redirectUrl } from "../../../environment";
import logo from "../../../images/logo.png";
import { SessionService } from "../../../services/session-service";

import template from "./navigation.html";

import "./navigation.scss";

@customElement({
    name: "navigation",
    template: template,
    containerless: true,
})
@inject(SessionService, IRouter, IEventAggregator)
export class Navigation implements ICustomElementViewModel {
    constructor(
        private sessionService: SessionService,
        private router: IRouter,
        readonly ea: IEventAggregator
    ) {}

    @bindable() user: any;
    @bindable isLoading: boolean;
    guildId: number;
    drawer = {
        open: null,
    };
    currentRoute;
    donateDialog;
    logo = logo;
    menuOpen = false;

    async handleServerChange(event: CustomEvent) {
        this.guildId = event.detail?.value;
        //const childRoute = this.router.activeNavigation ? `/${this.router.currentInstruction.params.childRoute}` : null
        await this.router.load(`guild/${this.guildId}`);
        location.reload();
    }

    attached() {
        this.drawer.open = this.sessionService.getStorageItem(
            SessionService.SIDEBAR_STATUS_KEY,
            true
        );
        this.ea.subscribe("user-updated", (payload) => {
            this.user = payload;
            if (!this.user) {
                this.guildId = null;
            }
        });
        this.ea.subscribe("guild-updated", (payload) => {
            this.guildId = payload as number;
        });
        //this.currentRoute = this.router.;
    }

    async toggleSidebar() {
        const newDrawerStatus = !this.drawer.open;
        this.drawer.open = newDrawerStatus;
        this.sessionService.saveStorageItem(
            SessionService.SIDEBAR_STATUS_KEY,
            String(newDrawerStatus)
        );
        this.ea.publish("drawer-updated", newDrawerStatus);
    }

    async logout() {
        await this.sessionService.clearSession();
        await this.router.load("");
        location.reload();
    }

    get discordOauthUrl() {
        return `https://discord.com/api/oauth2/authorize?client_id=${botClientId()}&redirect_uri=${redirectUrl()}&response_type=code&scope=identify%20email%20guilds`;
    }

    get avatarLink() {
        if (this.user?.discordId && this.user?.avatar) {
            return `https://cdn.discordapp.com/avatars/${this.user.discordId}/${this.user.avatar}.webp`;
        }
        return null;
    }
}
