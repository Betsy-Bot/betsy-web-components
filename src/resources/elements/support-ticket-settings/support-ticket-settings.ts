import {DiscordService} from "../../../services/discord-service";
import {bindable, inject} from "aurelia-framework";
export const SupportTicketAudits = [
    "Opened",
    "Closed",
    "Deleted",
    "RoleAdded",
    "RoleRemoved",
    "UserAdded",
    "UserRemoved"
];

@inject(DiscordService)
export class SupportTicketSettings {
    constructor(private discordService: DiscordService) {
    }
    @bindable request;
    @bindable guildId;
    @bindable authorizedRole;

    roles;
    tab = 'settings';

    async created() {
        this.roles = await this.discordService.getDiscordRoles(this.guildId);
    }

    removeRole(index) {
        this.request.assignedRoles.splice(index, 1)
    }

    getRoleName(roleId) {
        let found = this.roles.filter(x => x.id == roleId);
        return found[0].name;
    }
}
