import { bindable, inject } from 'aurelia-framework';
import { SessionService } from "../../../services/session-service";
import { Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import {redirectUrl, botClientId} from "../../../environment";
import './navigation.scss';

@inject(SessionService, Router, EventAggregator)
export class Navigation {
    constructor(private sessionService: SessionService,private router: Router, readonly ea: EventAggregator) {
    }

    @bindable() user: any;
    guildId: any;
    drawer = {
      open: null
    };

    handleServerChange(event: CustomEvent) {
        this.guildId = event?.detail?.value;
        this.router.navigate(`guild/${this.guildId}`);
    }

    attached() {
      this.drawer.open = this.sessionService.getStorageItem(SessionService.SIDEBAR_STATUS_KEY, true);
      this.ea.subscribe('user-updated', payload => {
        this.user = payload;
      });
      this.ea.subscribe('guild-updated', payload => {
        this.guildId = payload;
      });
    }

  async toggleSidebar() {
    const newDrawerStatus = !this.drawer.open;
    this.drawer.open = newDrawerStatus;
    this.sessionService.saveStorageItem(SessionService.SIDEBAR_STATUS_KEY, String(newDrawerStatus));
    this.ea.publish('drawer-updated', newDrawerStatus);
  }

    async logout() {
        await this.sessionService.logout();
        this.router.navigate('login');
    }

    get discordOauthUrl() {
        return `https://discord.com/api/oauth2/authorize?client_id=${botClientId()}&redirect_uri=${redirectUrl()}&response_type=code&scope=identify%20email%20guilds`;
    }

    get avatarLink() {
        return `https://cdn.discordapp.com/avatars/${this.user.discordId}/${this.user.avatar}.webp`
    }
}
