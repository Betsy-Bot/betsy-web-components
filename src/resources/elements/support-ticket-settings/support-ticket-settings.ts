import { DiscordService } from "../../../services/discord-service";
import { bindable, customElement, inject, observable } from "aurelia";
import template from "./support-ticket-settings.html";
export const SupportTicketAudits = [
    "Opened",
    "Closed",
    "Deleted",
    "RoleAdded",
    "RoleRemoved",
    "UserAdded",
    "UserRemoved",
];
@customElement({
    name: "support-ticket-settings",
    template: template,
    containerless: true,
})
@inject(DiscordService)
export class SupportTicketSettings {
    constructor(private discordService: DiscordService) {}
    @bindable request;
    @bindable guildId;
    @bindable authorizedRole;
    @bindable selectedAuditOption;

    roles;
    tab = "settings";
    options: string[] = SupportTicketAudits;
    async binding() {
        this.roles = await this.discordService.getDiscordRoles();
    }

    selectAuditOption() {
        if (this.selectedAuditOption) {
            if (!this.request.supportTicketAudits) {
                this.request.supportTicketAudits = [];
            }
            this.request.supportTicketAudits.push(this.selectedAuditOption);
            this.selectedAuditOption = null;
        }
    }

    removeAuditOption(index) {
        this.request.supportTicketAudits.splice(index, 1);
    }

    removeRole(index) {
        this.request.assignedRoles.splice(index, 1);
    }

    getRoleName(roleId) {
        const found = this.roles.find((x) => x.id == roleId);
        if (!found) {
            return "";
        }
        return found?.name;
    }
}
