import {bindable, inject} from "aurelia-framework";
import {DiscordService} from "services/discord-service";

@inject(DiscordService)
export class DiscordRoleSelector {
    constructor(private discordService: DiscordService) {
    }
    @bindable guildId: string;
    @bindable selectedRole: string;
    @bindable label;
    @bindable required: boolean = false;

    roles;

    async attached() {
        this.roles = await this.discordService.getDiscordRoles(this.guildId);
    }

    getColorStyle(color) {
        return `color: #${color?.toString(16)}`
    }
}
