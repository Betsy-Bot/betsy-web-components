import {bindable, inject} from "aurelia-framework";
import {DiscordService} from "../../../services/discord-service";

@inject(DiscordService)
export class TrackedMessageCreator {
    constructor(private discordService: DiscordService) {
    }
    @bindable request;
    @bindable guildId;
    @bindable allowComponents;
    @bindable maxComponents;
    @bindable authorizedRole;

    roles;

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
