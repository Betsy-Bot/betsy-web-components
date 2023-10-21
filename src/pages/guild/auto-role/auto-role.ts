import { inject } from 'aurelia';
import { route, Router } from '@aurelia/router-lite';
import { IRouteViewModel } from '@aurelia/router-lite';

import { DiscordService } from '../../../services/discord-service';

import { toast } from 'lets-toast';

@route({
    path: 'role-selector',
    title: 'Role Selector',
})
@inject(DiscordService, Router)
export class AutoRole implements IRouteViewModel {
    constructor(private discordService: DiscordService) {}

    guildId;
    containers;

    async attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
        [this.containers] = await Promise.all([
            await this.discordService.getAutoroleContainers(
                this.discordService.getLocalDiscordGuildId()
            ),
        ]);
    }

    async updateActive(message) {
        const foundCommandIndex = this.containers.findIndex(
            (x) => x.name === message.name
        );
        if (foundCommandIndex >= 0) {
            await this.discordService.toggleAutoroleContainer(message.id);
            toast(`Active status has been updated for /${message.name}`, {
                severity: 'success',
            });
        } else {
            toast('Error', { severity: 'error' });
        }
    }
}
