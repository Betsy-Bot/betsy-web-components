import { inject } from 'aurelia';
import { IRouteViewModel, Router } from '@aurelia/router-lite';

import { SessionService } from '../../services/session-service';
import { UserService } from '../../services/user-service';
import { WebhookService } from '../../services/websocket-service';

@inject(SessionService, UserService, WebhookService, Router)
export class Home implements IRouteViewModel {
  constructor(private sessionService: SessionService, private userService: UserService, private webhookService: WebhookService, private router: Router) {}

  user;
  private managedGuilds;
  private otherGuilds;
  connection;

  async attached() {
    this.user = await this.sessionService.getUser();

    if (this.user?.adminedServers) {
      // eslint-disable-next-line no-unsafe-optional-chaining
      for (const server of this.user?.adminedServers) {
        server.id = server.guildId;
      }
    }

    const userGuilds = await this.userService.getGuilds();
    for (const guild of userGuilds) {
      guild.icon_extension = guild.icon?.startsWith('a_') ? 'gif' : 'webp';
      guild.can_add = guild.owner || (guild.permissions & 0x8) == 0x8;
    }

    this.managedGuilds = userGuilds.filter((g) => g.can_add);
    this.otherGuilds = userGuilds.filter((g) => !g.can_add);

    for (const guild of this.managedGuilds) {
      const foundServerIndex = this.user.activeServers.findIndex((x) => x.guildId == guild.id);
      if (foundServerIndex >= 0) {
        guild.exists = true;
        guild.invited = this.user.activeServers[foundServerIndex].invited;
        this.user.activeServers[foundServerIndex].name = guild.name;
      }
    }

    this.connection = this.webhookService.subscribeToGuildInvite();
    await this.connection.start();
    this.connection.on('BotInvited', async (id, name, description) => {
      await this.router.load(`/guild/${id}`);
    });
  }
}
