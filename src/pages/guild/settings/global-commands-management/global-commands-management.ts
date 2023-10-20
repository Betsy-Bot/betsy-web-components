import { inject } from "aurelia";
import { IRouteViewModel, route } from "@aurelia/router-lite";

import { DiscordService } from "../../../../services/discord-service";
import { IDiscordGuild } from "../../../../services/models/discord";
import { SessionService } from "../../../../services/session-service";

import { toast } from "lets-toast";

@route({
    path: "global-commands-management",
    title: "Global Commands Management",
})
@inject(DiscordService, SessionService)
export class GlobalCommandsManagement implements IRouteViewModel {
    constructor(
        private discordService: DiscordService,
        private sessionService: SessionService,
    ) {
    }

    guildId: string;
    guild: IDiscordGuild;
    isAdmin: boolean;
    isOwner: boolean;

    async attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
        [this.guild, this.isAdmin] = await Promise.all([
            await this.discordService.getDiscordServerInformation(this.guildId),
            await this.sessionService.isAdmin(this.guildId)
        ]);
        this.isOwner = await this.sessionService.isOwner(this.guild?.guild?.ownerId);
    }

    async registerCommand(commandType: string) {
        try {
            switch(commandType) {
                case 'Ai':
                    await this.discordService.registerAiGlobalCommand();
                    break;
                case 'Review':
                    await this.discordService.registerReviewGlobalCommand();
                    break;
                case 'KeyValue':
                    await this.discordService.registerKeyValueGlobalCommand();
                    break;
                case 'Giveaway':
                    await this.discordService.registerGiveawayGlobalCommand();
                    break;
                case 'Ticket':
                    await this.discordService.registerTicketGlobalCommand();
                    break;
                case 'Payments':
                    await this.discordService.registerPaymentsGlobalCommand();
                    break;
                case 'Poll':
                    await this.discordService.registerPollGlobalCommand();
                    break;
            }
            toast("Registered Global Command", { severity: "success" });
        } catch {
            toast("Failed to register command", { severity: "error" });
        }
    }

}
