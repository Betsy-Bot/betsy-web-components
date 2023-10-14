import { bindable, inject } from "aurelia";
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

    async registerAiCommand() {
        try {
            await this.discordService.registerAiGlobalCommand();
            toast("Registered Global Command", { severity: "success" });
        } catch {
            toast("Failed to register command", { severity: "error" });
        }
    }

    async registerReviewCommand() {
        try {
            await this.discordService.registerReviewGlobalCommand();
            toast("Registered Global Command", { severity: "success" });
        } catch {
            toast("Failed to register command", { severity: "error" });
        }
    }

    async registerKeyValueCommand() {
        try {
            await this.discordService.registerKeyValueGlobalCommand();
            toast("Registered Global Command", { severity: "success" });
        } catch {
            toast("Failed to register command", { severity: "error" });
        }
    }

    async registerGiveawayCommand() {
        try {
            await this.discordService.registerGiveawayGlobalCommand();
            toast("Registered Global Command", { severity: "success" });
        } catch {
            toast("Failed to register command", { severity: "error" });
        }
    }

    async registerTicketCommand() {
        try {
            await this.discordService.registerTicketGlobalCommand();
            toast("Registered Global Command", { severity: "success" });
        } catch {
            toast("Failed to register command", { severity: "error" });
        }
    }

    async registerPaymentsCommand() {
        try {
            await this.discordService.registerPaymentsGlobalCommand();
            toast("Registered Global Command", { severity: "success" });
        } catch {
            toast("Failed to register command", { severity: "error" });
        }
    }
}
