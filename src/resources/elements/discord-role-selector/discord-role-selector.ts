import {
    bindable, BindingMode, containerless,
    ICustomElementViewModel,
    inject,
} from "aurelia";

import { DiscordService } from "../../../services/discord-service";


@containerless()
@inject(DiscordService)
export class DiscordRoleSelector implements ICustomElementViewModel {
    constructor(private discordService: DiscordService) {}
    @bindable({ mode: BindingMode.twoWay }) selectedRole: string;
    @bindable label;
    @bindable required = false;
    @bindable roleId;
    @bindable disabled;

    roles;

    async attached() {
        this.roles = await this.discordService.getDiscordRoles();
        if (!this.roles) {
            const guild = await this.discordService.getDiscordServerInformation(
                this.discordService.getLocalDiscordGuildId()
            );
            this.roles = guild.guild.roles;
        }
        if (this.roleId) {
            this.selectedRole = this.roles.find((x) => x.id == this.roleId);
        }
    }

    getColorStyle(color) {
        return `color: #${color?.toString(16)}`;
    }
}
