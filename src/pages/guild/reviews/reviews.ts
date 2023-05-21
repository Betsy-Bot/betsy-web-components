import { route, Router } from "@aurelia/router-lite";
import { inject, observable } from "aurelia";
import { DiscordService } from "../../../services/discord-service";
import { DiscordNameValueConverter } from "../../../resources/value-converters";
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
        for (let review of this.reviews) {
            let name = await this.discordNameValueConverter.toView(
                review.discordUserId
            );
            review.displayName = `${name} (${review.discordUserId})`;
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
        if (!this.guild.reviewSettings) {
            this.guild.reviewSettings = {};
        }
        if (!this.guild?.reviewSettings?.reviewsChannelId) {
            return;
        }
        await this.discordService.updateReviewSettingsForGuild(this.guild);
        toast("Updated Settings", { severity: "success" });
    }
}
