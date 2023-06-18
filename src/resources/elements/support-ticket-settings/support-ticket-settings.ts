import { bindable, containerless, inject } from "aurelia";
import { watch } from "@aurelia/runtime-html";

import { DiscordService } from "../../../services/discord-service";

import { MDCDialog, MDCDialogCloseEvent } from "@material/dialog";

export const SupportTicketAudits = [
    "Opened",
    "Closed",
    "Deleted",
    "RoleAdded",
    "RoleRemoved",
    "UserAdded",
    "UserRemoved",
];

@containerless()
@inject(DiscordService)
export class SupportTicketSettings {
    constructor(private discordService: DiscordService) {}

    @bindable request;
    @bindable authorizedRole;
    @bindable selectedAuditOption;
    addRoleOptionDialog: MDCDialog;
    roleToAdd = {
        roleId: "",
        prefixOverride: "",
    };

    roles: any[];
    tab = "settings";
    options: string[] = SupportTicketAudits;

    async binding() {
        this.roles = await this.discordService.getDiscordRoles();
    }

    selectedAuditOptionChanged() {
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

    removeRoleOption(index) {
        this.request.supportTicketRoleOptions.splice(index, 1);
    }

    getRoleName(roleId) {
        const found = this.roles.find((x) => x.id == roleId);
        if (!found) {
            return "";
        }
        return found?.name;
    }

    @watch("roleToAdd.roleId")
    roleToAddIdChanged() {
        if (this.roleToAdd.roleId) {
            this.addRoleOptionDialog.open();
        }
    }

    addRoleOption(event: MDCDialogCloseEvent) {
        if (event.detail.action == "ok") {
            if (!this.request.supportTicketRoleOptions) {
                this.request.supportTicketRoleOptions = [];
            }
            console.log(this.roleToAdd);
            this.request.supportTicketRoleOptions.push(this.roleToAdd);
            this.roleToAdd = { roleId: "", prefixOverride: "" };
        }
    }
}
