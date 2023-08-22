import { bindable, inject } from "aurelia";
import { IRouteViewModel, route, Router } from "@aurelia/router-lite";

import { DiscordService } from "../../../services/discord-service";
import { IDiscordGuild } from "../../../services/models/discord";
import { SessionService } from "../../../services/session-service";

import { toast } from "lets-toast";

@route({
    path: "settings",
    title: "Settings",
})
@inject(DiscordService, Router, SessionService)
export class Settings implements IRouteViewModel {
    constructor(
        private discordService: DiscordService,
        private router: Router,
        private sessionService: SessionService,
    ) {}

    guildId: string;
    guild: IDiscordGuild;
    isAdmin: boolean;
    @bindable selectedRole;
    permissionUserId: string;
    roles;
    newOwnerId: string;
    isOwner: boolean;
    ownerUserId: string;

    async attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
        [this.guild, this.isAdmin, this.roles] = await Promise.all([
            await this.discordService.getDiscordServerInformation(this.guildId),
            await this.sessionService.isAdmin(this.guildId),
            await this.discordService.getDiscordRoles(),
        ]);
        this.isOwner = await this.sessionService.isOwner(this.guild?.guild?.ownerId);
    }

    async addAuthorizedUser() {
        if (this.guild.authorizedUsers.findIndex((x) => x == this.permissionUserId) == -1) {
            this.guild.authorizedUsers.push(this.permissionUserId);
        }
        await this.discordService.updateAuthorizedUsersForGuild(this.guild, this.guildId);
        toast("Updated Authorized Users", { severity: "success" });
    }

    async removeUser(index) {
        this.guild.authorizedUsers.splice(index, 1);
        await this.discordService.updateAuthorizedUsersForGuild(this.guild, this.guildId);
        toast("Updated Authorized Users", { severity: "success" });
    }

    async addAuthorizedOwner() {
        if (this.guild.authorizedOwners.findIndex((x) => x == this.ownerUserId) == -1) {
            this.guild.authorizedOwners.push(this.ownerUserId);
        }
        await this.discordService.updateAuthorizedOwnersForGuild(this.guild, this.guildId);
        toast("Updated Authorized Owners", { severity: "success" });
    }

    async removeOwner(index) {
        this.guild.authorizedOwners.splice(index, 1);
        await this.discordService.updateAuthorizedOwnersForGuild(this.guild, this.guildId);
        toast("Updated Authorized Owners", { severity: "success" });
    }

    async updateGlobalSettings() {
        await this.discordService.updateGlobalSettingsForGuild(this.guild, this.guildId);
        toast("Updated Custom Bot Settings", { severity: "success" });
    }

    async updateConfigurationOwner() {
        try {
            await this.discordService.updateConfigurationOwnerForGuild(this.newOwnerId, this.guildId);
            toast("Updated Configuration Owner", { severity: "success" });
        } catch(e) {
            toast("Failed to Update", { severity: "error" });
        }
    }

    async updateAutoRolesSettings() {
        await this.discordService.updateAutoRolesForGuild(this.guild, this.guildId);
        toast("Updated Auto Roles", { severity: "success" });
    }

    selectedRoleChanged() {
        if (!this.guild.globalSettings) {
            this.guild.globalSettings = {};
        }
        if (!this.guild.globalSettings.autoRoles) {
            this.guild.globalSettings.autoRoles = [];
        }
        if (this.selectedRole) {
            this.guild.globalSettings.autoRoles.push({
                name: this.getRoleName(),
                discordRoleId: this.selectedRole,
            });
        }
    }

    async removeRole(index) {
        this.guild.globalSettings.autoRoles.splice(index, 1);
    }

    getRoleName() {
        return this.roles?.find((x) => x.id == this.selectedRole)?.name;
    }

    async toggleCustomBot() {
        if (
            window.confirm(
                `This will ${
                    this.guild.customBotActive ? "deactivate" : "activate"
                } the custom bot for your server. Are you sure?`,
            )
        ) {
            this.guild.customBotActive = !!this.guild.customBotActive;
            const response = await this.discordService.toggleCustomBotActive(this.guild.customBotActive);
            if (response) {
                toast(`Custom bot ${this.guild.customBotActive ? "activate" : "deactivated"}.`, {
                    severity: "success",
                });
            } else {
                toast("Failed to set custom bot status", {
                    severity: "error",
                });
            }
        }
    }
}
