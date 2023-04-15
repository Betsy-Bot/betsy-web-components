import { Params, route, Router } from "@aurelia/router-lite";
import { inject } from "aurelia";
import { IEventAggregator } from "aurelia";
import { DiscordService } from "../../../../../services/discord-service";
import { IRouteViewModel } from "@aurelia/router-lite";

@route({
    path: "channel-backups/:backupId",
    title: "Channel Backup",
})
@inject(IEventAggregator, DiscordService, Router)
export class ChannelBackup implements IRouteViewModel {
    constructor(
        private eventAggregator: IEventAggregator,
        private discordService: DiscordService,
        private router: Router
    ) {}
    guildId: string;
    channelBackup: any;
    backupId: string;

    loading(params: Params) {
        this.backupId = params.backupId;
    }
    async attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
        this.channelBackup = await this.discordService.getDiscordChannelBackup(
            this.backupId
        );
    }
}
