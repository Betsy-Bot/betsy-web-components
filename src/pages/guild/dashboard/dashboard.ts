import { inject } from 'aurelia';
import {IRouteViewModel, route} from '@aurelia/router-lite';

import { DiscordService } from '../../../services/discord-service';

import './dashboard.scss';

@route({
    path: "",
    title: "Dashboard",
},)
@inject(DiscordService)
export class Dashboard implements IRouteViewModel {
  constructor(private discordService: DiscordService) {}

  guildId: string;
  guild;
  channels;

  stats = [
    {
      prefix: '~',
      title: 'Member Count',
      property: 'approximateMemberCount',
    },
    {
      title: 'Emoji Count',
      function: 'getEmojiCount',
    },
    {
      title: 'Channel Count',
      function: 'getChannelCount',
    },
  ];

  async attached() {
    this.guildId = this.discordService.getLocalDiscordGuildId();
    [this.guild, this.channels] = await Promise.all([await this.discordService.getDiscordServerInformation(this.guildId), await this.discordService.getDiscordChannels(this.guildId)]);
  }

  getStat(stat) {
    if (stat.property) {
      return this.guild?.guild[stat.property];
    }
    if (!this[stat.function]) return;
    return this[stat.function]();
  }

  getEmojiCount() {
    return this.guild?.guild?.emojis?.length;
  }

  getChannelCount() {
    return this.channels?.length;
  }
}
