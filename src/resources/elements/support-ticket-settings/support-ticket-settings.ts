import {DiscordService} from "../../../services/discord-service";
import {bindable, inject} from "aurelia-framework";

@inject(DiscordService)
export class SupportTicketSettings {
    constructor(private discordService: DiscordService) {
    }
    @bindable request;
    @bindable guildId;
    @bindable authorizedRole;

    roles;
    tab = 'container';

    async created() {
        this.roles = await this.discordService.getDiscordRoles(this.guildId);
    }

    removeRole(index) {
        this.request.settings.assignedRoles.splice(index, 1)
    }

    getRoleName(roleId) {
        let found = this.roles.filter(x => x.id == roleId);
        return found[0].name;
    }
}
