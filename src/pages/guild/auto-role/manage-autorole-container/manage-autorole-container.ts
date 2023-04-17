import { inject } from "aurelia";
import { route, Router } from "@aurelia/router-lite";
import { IRouteViewModel } from "@aurelia/router-lite";
import { watch } from "@aurelia/runtime-html";

import { DiscordService } from "../../../../services/discord-service";

import { toast } from "lets-toast";

@route({
    path: "role-selector/:containerId",
    title: "Manage Role Selector",
})
@inject(DiscordService, Router)
export class ManageAutoroleContainer implements IRouteViewModel {
    constructor(
        private discordService: DiscordService,
        private router: Router
    ) {}

    guildId;
    containerId;
    container = {
        active: true,
        discordServerId: "",
        type: 1,
        discordMessage: {
            message: {
                embeds: [],
                components: [],
            },
        },
        discordRoles: [],
    };
    isNew = false;
    tab = "container";

    selectedRole;
    roles;

    async loading(params) {
        this.containerId = params.containerId as string;
    }

    async attached() {
        this.roles = await this.discordService.getDiscordRoles();
        if (this.containerId && this.containerId != "0") {
            this.container = await this.discordService.getAutoroleContainer(
                this.containerId
            );
            if (!this.container) {
                this.container.discordServerId =
                    this.discordService.getLocalServerId();
                return toast(
                    "No container found by this ID. You are now creating a new Auto Role Container."
                );
            }
            const emojis = await this.discordService.getLocalGuild().guild
                .emojis;
            for (const role of this.container.discordRoles) {
                role.emoji = emojis.find((x) => x.id === role.discordEmojiId);
            }
        } else {
            this.isNew = true;
            this.container.discordServerId =
                this.discordService.getLocalServerId();
        }
    }

    @watch('selectedRole')
    selectedRoleChanged() {
        console.log(this.selectedRole);
        const foundRole = this.roles.find(x => x.id == this.selectedRole);
        console.log(foundRole);
        if (this.container.discordRoles.length >= 25) {
            return toast("A max of 25 roles are allowed for select menus", {
                severity: "error",
            });
        }
        if (
            !this.container.discordRoles.find(
                (x) => x.discordRoleId === this.selectedRole
            )
        ) {
            this.container.discordRoles.push({
                discordRoleId: foundRole.id,
                name: foundRole.name,
                label: foundRole.name,
                value: foundRole.name,
                description: "",
                discordServerId: this.discordService.getLocalServerId(),
            });
        }
    }

    async putContainer() {
        try {
            for (const role of this.container.discordRoles) {
                if (!role.emoji) continue;
                role.discordEmojiId = role.emoji.id;
            }
            if (this.isNew) {
                await this.discordService.createAutoroleContainer(
                    this.container
                );
            } else {
                await this.discordService.updateAutoroleContainer(
                    this.container
                );
            }
            toast(
                `Auto Role Container Successfully ${
                    this.isNew ? "Created" : "Updated"
                }`,
                { severity: "success" }
            );
        } catch (e) {
            toast(`Failed to update Auto Role Container.`, {
                severity: "error",
            });
            console.log(e);
        }
    }

    removeRole(index) {
        this.container.discordRoles.splice(index, 1);
    }
}
