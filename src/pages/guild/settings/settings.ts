import { EventAggregator } from "aurelia-event-aggregator";
import { DiscordService } from "../../../services/discord-service";
import { Router } from "aurelia-router";
import { SessionService } from "../../../services/session-service";
import { bindable, inject } from "aurelia-framework";
import { toast } from "lets-toast";

@inject(EventAggregator, DiscordService, Router, SessionService)
export class Settings {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router, private sessionService: SessionService) {
    }

    async activate(params) {
        this.params = params;
    }

    guildId: string;
    guild;
    params;
    isAdmin;
    @bindable selectedRole;

    async attached() {
        this.guildId = this.params.guildId;
        [this.guild, this.isAdmin] = await Promise.all([
            await this.discordService.getDiscordServerInformation(this.guildId),
            await this.sessionService.isAdmin(this.guildId)
        ]);
    }

    permissionUserId;

    async addAuthorizedUser() {
        if (this.guild.authorizedUsers.findIndex( x => x == this.permissionUserId) == -1) {
            this.guild.authorizedUsers.push(this.permissionUserId);
        }
        await this.discordService.updateAuthorizedUsersForGuild(this.guild, this.guildId);
        toast('Updated Authorized Users', { severity: 'success' });
    }

    async removeUser(index) {
        this.guild.authorizedUsers.splice(index, 1);
        await this.discordService.updateAuthorizedUsersForGuild(this.guild, this.guildId);
        toast('Updated Authorized Users', { severity: 'success' });
    }

    async updateGlobalSettings() {
        await this.discordService.updateGlobalSettingsForGuild(this.guild, this.guildId);
        toast("Updated Custom Bot Settings", { severity: 'success' })
    }

    async updateAutoRolesSettings() {
        await this.discordService.updateAutoRolesForGuild(this.guild, this.guildId);
        toast("Updated Auto Roles", { severity: 'success' })
    }

    async selectedRoleChanged() {
        if (!this.guild.globalSettings) {
            this.guild.globalSettings = {};
        }
        if (!this.guild.globalSettings.autoRoles) {
            this.guild.globalSettings.autoRoles = [];
        }
        if (this.selectedRole) {
            this.guild.globalSettings.autoRoles.push({
                name: this.selectedRole.name,
                discordRoleId: this.selectedRole.id
            });
        }
    }

    async removeRole(index) {
        this.guild.globalSettings.autoRoles.splice(index, 1);
    }
}

