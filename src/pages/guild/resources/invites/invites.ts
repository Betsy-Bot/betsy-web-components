import { inject } from "aurelia";
import { route } from "@aurelia/router-lite";

import { DiscordNameValueConverter } from "../../../../resources/value-converters/discord-name";
import { DiscordService } from "../../../../services/discord-service";
import { IDiscordGuild, IDiscordGuildUserInvite } from "../../../../services/models/discord";

import { MDCDialog, MDCDialogCloseEvent } from "@material/dialog";
import DataGrid from "devextreme/ui/data_grid";
import { toast } from "lets-toast";

@route({
    path: "invites",
    title: "Invites",
})
@inject(DiscordService, DiscordNameValueConverter)
export class Invites {
    constructor(private discordService: DiscordService, private discordNameValueConverter: DiscordNameValueConverter) {}

    guildId: string;
    guild: IDiscordGuild;
    featureActive: boolean;
    roleId;
    invites;
    guildUserInvites: IDiscordGuildUserInvite[];
    inviteColumns;
    guildUserInvitesColumns;
    dataGridControl: DataGrid;
    tab = "links";
    newInviteRole = {
        roleId: "",
        count: 1,
    };
    createInviteRole: MDCDialog;

    gridSummary = {
        groupItems: [
            {
                column: "code",
                summaryType: "count",
            },
            {
                column: "uses",
                summaryType: "sum",
            },
        ],
    };

    async attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
        [this.guild, this.invites, this.guildUserInvites] = await Promise.all([
            this.discordService.getDiscordServerInformation(this.guildId),
            this.discordService.getInvites(),
            this.discordService.getGuildUserInvites(),
        ]);
        if (!this.guild.inviteSettings) {
            this.guild.inviteSettings = {};
        }
        if (this.invites) {
            for (const invite of this.invites) {
                const name = await this.discordNameValueConverter.toView(invite.inviterDiscordUserId);
                invite.displayName = `${name} (${invite.inviterDiscordUserId})`;
            }
        }
        if (this.guildUserInvites) {
            for (const invite of this.guildUserInvites) {
                const invitedByName = await this.discordNameValueConverter.toView(invite.invitedBy);
                invite.invitedByDisplay = `${invitedByName} (${invite.invitedBy})`;
                const name = await this.discordNameValueConverter.toView(invite.discordUserId);
                invite.displayName = `${name} (${invite.discordUserId})`;
            }
        }
        this.featureActive = this.guild.activeFeatures.includes(this.discordService.INVITE_LINKS);
        this.inviteColumns = [
            {
                dataField: "code",
            },
            {
                dataField: "uses",
            },
            {
                dataField: "maxUses",
            },
            {
                dataField: "displayName",
                groupIndex: 0,
            },
            {
                dataField: "expiresAt",
                dataType: "datetime",
            },
        ];

        this.guildUserInvitesColumns = [
            {
                dataField: "displayName",
            },
            {
                dataField: "invitedByDisplay",
            },
        ];
    }

    async toggleFeature() {
        if (this.featureActive) {
            this.guild.activeFeatures.push(this.discordService.INVITE_LINKS);
            await this.discordService.setActiveFeaturesForDiscord(this.guildId, this.guild.activeFeatures);
        } else {
            this.guild.activeFeatures = this.guild.activeFeatures.filter((x) => x !== this.discordService.INVITE_LINKS);
            await this.discordService.setActiveFeaturesForDiscord(this.guildId, this.guild.activeFeatures);
        }
        toast(this.featureActive ? "Toggled feature on. Refresh page to see invites" : "Toggled feature off");
    }

    handleCreateDialog(event: MDCDialogCloseEvent) {
        if (event.detail.action == "ok") {
            if (!this.guild.inviteSettings.inviteRoles) {
                this.guild.inviteSettings.inviteRoles = [];
            }
            this.guild.inviteSettings.inviteRoles.push({
                count: this.newInviteRole.count,
                discordRoleId: this.newInviteRole.roleId,
            });
        }
    }

    removeRole(index: number) {
        this.guild.inviteSettings.inviteRoles.splice(index, 1);
    }

    async saveRoles() {
        await this.discordService.updateInviteSettingsForGuild(this.guild);
        toast("Updated Invite Settings", { severity: "success" });
    }
}