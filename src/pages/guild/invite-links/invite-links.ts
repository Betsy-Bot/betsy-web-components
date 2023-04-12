import { inject } from "aurelia";
import { toast } from "lets-toast";
import { DiscordService } from "../../../services/discord-service";
import { IRouteViewModel, route } from "@aurelia/router-lite";

@route({
    path: "invite-links",
    title: "Delete Invite Links",
})
@inject(DiscordService)
export class InviteLinks implements IRouteViewModel {
    constructor(private discordService: DiscordService) {}

    guildId: string;
    guild;
    featureActive;
    roleId;
    userId;

    async attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
        [this.guild] = await Promise.all([
            this.discordService.getDiscordServerInformation(this.guildId),
        ]);
        this.featureActive = this.guild.activeFeatures.includes(
            this.discordService.BLOCK_INVITES
        );
    }

    async save() {
        await this.discordService.setAuditLogChannelId(
            this.guildId,
            this.guild.auditLogChannelId
        );
        toast("Updated audit log channel");
    }

    async toggleFeature() {
        if (this.featureActive) {
            this.guild.activeFeatures.push(this.discordService.BLOCK_INVITES);
            await this.discordService.setActiveFeaturesForDiscord(
                this.guildId,
                this.guild.activeFeatures
            );
        } else {
            this.guild.activeFeatures = this.guild.activeFeatures.filter(
                (x) => x !== this.discordService.BLOCK_INVITES
            );
            await this.discordService.setActiveFeaturesForDiscord(
                this.guildId,
                this.guild.activeFeatures
            );
        }
        toast(
            this.featureActive ? "Toggled feature on" : "Toggled feature off"
        );
    }

    async addAuthorizedUser() {
        if (!this.guild.globalSettings) {
            this.guild.globalSettings = {};
        }
        if (!this.guild.globalSettings?.authorizedInviteSenders) {
            this.guild.globalSettings.authorizedInviteSenders = [];
        }
        if (
            this.guild.globalSettings.authorizedInviteSenders.findIndex(
                (x) => x == this.userId
            ) === -1
        ) {
            this.guild.globalSettings.authorizedInviteSenders.push({
                discordUserId: this.userId,
            });
        }
        await this.discordService.updateGlobalSettingsForGuild(
            this.guild,
            this.guildId
        );
        toast("Updated Authorized Users", { severity: "success" });
    }

    async removeUser(index) {
        this.guild.globalSettings.authorizedInviteSenders.splice(index, 1);
        await this.discordService.updateGlobalSettingsForGuild(
            this.guild,
            this.guildId
        );
        toast("Updated Authorized Users", { severity: "success" });
    }

    async addAuthorizedRole() {
        if (!this.guild.globalSettings) {
            this.guild.globalSettings = {};
        }
        if (!this.guild.globalSettings?.authorizedInviteSenderRoles) {
            this.guild.globalSettings.authorizedInviteSenderRoles = [];
        }
        if (
            this.guild.globalSettings.authorizedInviteSenderRoles.findIndex(
                (x) => x == this.roleId
            ) === -1
        ) {
            this.guild.globalSettings.authorizedInviteSenderRoles.push({
                discordRoleId: this.roleId,
            });
        }
        await this.discordService.updateGlobalSettingsForGuild(
            this.guild,
            this.guildId
        );
        toast("Updated Authorized Roles", { severity: "success" });
    }

    async removeRole(index) {
        this.guild.globalSettings.authorizedInviteSenderRoles.splice(index, 1);
        await this.discordService.updateGlobalSettingsForGuild(
            this.guild,
            this.guildId
        );
        toast("Updated Authorized Roles", { severity: "success" });
    }
}
