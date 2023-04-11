import { IEventAggregator, inject } from 'aurelia';
import { route, Router } from '@aurelia/router-lite';

import { SessionService } from './services/session-service';

import './app.scss';

import { toast } from 'lets-toast';

const routes = [
  {
    path: '',
    component: () => import('./pages/home/home'),
    title: 'Home',
  },
  {
    path: 'guild/:guildId',
    component: () => import('./pages/guild/guild'),
    title: 'Guild',
  },
  {
    path: '404',
    component: () => import('./pages/four-oh-four/four-oh-four'),
    title: '404',
  },
];

@route({ title: 'Besty Bot', routes: routes })
@inject(Router, IEventAggregator, SessionService)
export class App {
  constructor(private router: Router, private ea: IEventAggregator, private sessionService: SessionService) {}

  user;
  guildId;
  code: string;
  drawerOpen: boolean;

  expandOptions = {
    messaging: true,
    customCommands: true,
    moderation: true,
    resources: true,
    socials: true,
  };

  async attached() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    this.code = params.code;
    if (this.code) {
      try {
        this.user = await this.sessionService.loginWithOAuthCode(this.code);
      } catch (e) {
        toast('Failed to exchange code', { severity: 'error' });
      }
      urlSearchParams.delete('code');
    } else {
      this.user = await this.sessionService.getUser();
    }
    this.ea.subscribe('user-updated', (payload) => {
      this.user = payload;
    });
    this.ea.subscribe('guild-updated', (payload) => {
      this.guildId = payload;
    });
    this.ea.subscribe('drawer-updated', (payload) => {
      this.drawerOpen = payload as boolean;
    });

    if (this.user) {
      this.ea.publish('user-updated', this.user);
    }

    //For some reason without this timeout it fails to bind properly. Race condition
    setTimeout(() => {
      if (this.guildId && this.user) {
        this.drawerOpen = this.sessionService.getStorageItem(SessionService.SIDEBAR_STATUS_KEY) as boolean;
      }
    }, 100);
  }

  openSection(sectionName) {
    this.expandOptions[sectionName] = !this.expandOptions[sectionName];
  }
}
