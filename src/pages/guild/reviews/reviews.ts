import { inject, observable } from "aurelia";
import { route, Router } from "@aurelia/router-lite";

import { DiscordNameValueConverter } from "../../../resources/value-converters";
import { DiscordService } from "../../../services/discord-service";
import { DiscordButtonStyle } from "../../../services/models/discord";

import { MDCDialog, MDCDialogCloseEvent } from "@material/dialog";
import { toast } from "lets-toast";

@route({
    path: "reviews",
    title: "Reviews",
})
@inject(DiscordService, Router, DiscordNameValueConverter)
export class Reviews {
    constructor(
        private discordService: DiscordService,
        private router: Router,
        private discordNameValueConverter: DiscordNameValueConverter
    ) {}
    @observable channelId;
    guild;
    guildId;
    reviews: any[];
    columns;
    tab = 'settings';
    categoryDialog: MDCDialog;
    newCategory = {
        buttonStyle: DiscordButtonStyle.Primary,
        name: ""
    }

    types = [
        {
            value: 0,
            display: "Server Review",
        },
        {
            value: 1,
            display: "User Review",
        },
    ];

    async attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
        [this.guild, this.reviews] = await Promise.all([
            this.discordService.getDiscordServerInformation(this.guildId),
            this.discordService.getDiscordReviews(),
        ]);
        if (!this.guild.reviewSettings) {
            this.guild.reviewSettings = {};
        }
        for (const review of this.reviews) {
            const name = await this.discordNameValueConverter.toView(
                review.discordUserId
            );
            review.displayName = `${name} (${review.discordUserId})`;
            if (review.targetUserId) {
                const targetName = await this.discordNameValueConverter.toView(
                    review.targetUserId
                );
                review.targetDisplayName = `${targetName} (${review.targetUserId})`;
            }
        }
        this.columns = [
            {
                dataField: "message",
            },
            {
                dataField: "rating",
            },
            {
                dataField: "displayName",
            },
            {
                dataField: "targetDisplayName",
            },
            {
                dataField: "type",
                lookup: {
                    dataSource: this.types,
                    valueExpr: "value",
                    displayExpr: "display",
                },
            },
        ];
        if (!this.guild?.reviewSettings) {
            this.guild.reviewSettings = {};
        }
    }

    async handleSave() {
        if (!this.guild?.reviewSettings?.reviewsChannelId) {
            return;
        }
        await this.discordService.updateReviewSettingsForGuild(this.guild);
        toast("Updated Settings", { severity: "success" });
    }

    addCategory(event: MDCDialogCloseEvent) {
        if (event.detail.action == "ok") {
            if (!this.guild.reviewSettings.categories) {
                this.guild.reviewSettings.categories = [];
            }
        }
    }
}
