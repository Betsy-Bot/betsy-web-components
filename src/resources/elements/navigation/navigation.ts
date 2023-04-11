import {bindable, customElement, ICustomElementViewModel, inject} from 'aurelia';
import { SessionService } from "../../../services/session-service";
import { Router } from '@aurelia/router-lite';
import { IEventAggregator } from 'aurelia';
import { redirectUrl, botClientId } from "../../../environment";
import template from './navigation.html';
import './navigation.scss';

@customElement({
    name: 'navigation',
    template: template,
    containerless: true
})
@inject(SessionService, Router, IEventAggregator)
export class Navigation implements ICustomElementViewModel {
    constructor(private sessionService: SessionService, private router: Router, readonly ea: IEventAggregator) {
    }

    @bindable() user: any;
    guildId: number;
    drawer = {
        open: null
    };
    currentRoute;
    donateDialog;

    async handleServerChange(event: CustomEvent) {
        this.guildId = event?.detail?.value;
        //const childRoute = this.router.activeNavigation ? `/${this.router.currentInstruction.params.childRoute}` : null
        await this.router.load(`guild/${this.guildId}`);
        location.reload();
    }

    attached() {
        this.drawer.open = this.sessionService.getStorageItem(SessionService.SIDEBAR_STATUS_KEY, true);
        this.ea.subscribe('user-updated', payload => {
            this.user = payload;
            if (!this.user) {
                this.guildId = null;
            }
        });
        this.ea.subscribe('guild-updated', payload => {
            this.guildId = payload as number;
        });
        //this.currentRoute = this.router.;
    }

    async toggleSidebar() {
        const newDrawerStatus = !this.drawer.open;
        this.drawer.open = newDrawerStatus;
        this.sessionService.saveStorageItem(SessionService.SIDEBAR_STATUS_KEY, String(newDrawerStatus));
        this.ea.publish('drawer-updated', newDrawerStatus);
    }

    async logout() {
        await this.sessionService.clearSession();
        location.reload();
    }

    get discordOauthUrl() {
        return `https://discord.com/api/oauth2/authorize?client_id=${botClientId()}&redirect_uri=${redirectUrl()}&response_type=code&scope=identify%20email%20guilds`;
    }

    get avatarLink() {
        return `https://cdn.discordapp.com/avatars/${this.user.discordId}/${this.user.avatar}.webp`
    }
}
