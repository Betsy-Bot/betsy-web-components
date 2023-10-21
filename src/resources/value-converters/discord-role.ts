import { inject } from 'aurelia';

import { DiscordService } from '../../services/discord-service';

@inject(DiscordService)
export class DiscordRoleValueConverter {
    constructor(private discordService: DiscordService) {}
    public async toView(value: string) {
        if (!value) {
            return '';
        }
        const roles = await this.discordService.getDiscordRoles();
        if (!roles) return value;
        return this.getRoleName(value, roles);
    }

    getRoleName(roleId, roles): string {
        const found = roles.find((x) => x.id == roleId);
        if (!found) {
            return '';
        }
        return found?.name;
    }
}
