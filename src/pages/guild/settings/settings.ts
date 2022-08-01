import { EventAggregator } from "aurelia-event-aggregator";
import { DiscordService } from "../../../services/discord-service";
import { Router } from "aurelia-router";
import { SessionService } from "../../../services/session-service";
import { inject } from "aurelia-framework";
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

    async attached() {
        this.guildId = this.params.guildId;
        [this.guild] = await Promise.all([
            await this.discordService.getDiscordServerInformation(this.guildId)
        ]);
        console.log(this.guild);
    }

    permissionUserId;

    async addAuthorizedUser() {
        console.log(this.guild.authorizedUsers.findIndex( x => this.permissionUserId));
        if (this.guild.authorizedUsers.findIndex( x => x == this.permissionUserId) == -1) {
            this.guild.authorizedUsers.push(this.permissionUserId);
        }
        await this.discordService.updateAuthorizedUsersForGuild(this.guild, this.guildId);
        toast('Updated Authorized Users', {severity: 'success'});
    }

    async removeUser(index) {
        this.guild.authorizedUsers.splice(index, 1);
        await this.discordService.updateAuthorizedUsersForGuild(this.guild, this.guildId);
        toast('Updated Authorized Users', {severity: 'success'});
    }
}

