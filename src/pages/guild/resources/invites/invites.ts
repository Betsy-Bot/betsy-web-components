import { inject } from "aurelia";
import { route } from "@aurelia/router-lite";

import { DiscordNameValueConverter } from "../../../../resources/value-converters/discord-name";
import { DiscordService } from "../../../../services/discord-service";
import { IDiscordGuild } from "../../../../services/models/discord";

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
    columns;
    dataGridControl: DataGrid;

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
        [this.guild, this.invites] = await Promise.all([
            this.discordService.getDiscordServerInformation(this.guildId),
            this.discordService.getInvites(),
        ]);
        for (const invite of this.invites) {
            const name = await this.discordNameValueConverter.toView(invite.inviterDiscordUserId);
            invite.displayName = `${name} (${invite.inviterDiscordUserId})`;
        }
        this.featureActive = this.guild.activeFeatures.includes(this.discordService.INVITE_LINKS);
        this.columns = [
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
}
