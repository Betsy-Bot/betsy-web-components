import {
    bindable, BindingMode,
    customElement,
    ICustomElementViewModel,
    inject,
} from "aurelia";

import { DiscordService } from "../../../services/discord-service";

import template from "./discord-role-selector.html";

@customElement({
    name: "discord-role-selector",
    template: template,
    containerless: true,
})
@inject(DiscordService)
export class DiscordRoleSelector implements ICustomElementViewModel {
    constructor(private discordService: DiscordService) {}
    @bindable({ mode: BindingMode.twoWay }) selectedRole: string;
    @bindable label;
    @bindable required = false;
    @bindable removeEveryone = false;
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
        if (this.removeEveryone) {
            this.roles.splice(0, 1);
        }
    }

    getColorStyle(color) {
        return `color: #${color?.toString(16)}`;
    }
}
