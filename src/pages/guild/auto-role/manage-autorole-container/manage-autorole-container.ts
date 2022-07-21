import { DiscordService } from "../../../../services/discord-service";
import { Router } from "aurelia-router";
import { bindable, inject } from "aurelia-framework";
import { toast } from "lets-toast";

@inject(DiscordService, Router)
export class ManageAutoroleContainer {
    constructor(private discordService: DiscordService, private router: Router) {
    }

    guildId;
    containerId;
    container = {
        active: true,
        discordServerId: '',
        type: 1,
        discordMessage: {
            message: {
                embeds: [],
                components: []
            }
        },
        discordRoles: []
    };
    isNew = false;
    tab = 'container';

    @bindable selectedRole;

    async activate(params) {
        this.containerId = params.containerId as string;
    }

    async attached() {
        if (this.containerId && this.containerId != '0') {
            this.container = await this.discordService.getAutoroleContainer(this.containerId);
            if (!this.container) {
                this.container.discordServerId = this.discordService.getLocalServerId();
                return toast("No container found by this ID. You are now creating a new Auto Role Container.");
            }
            const emojis = await this.discordService.getLocalGuild().guild.emojis;
            for (let role of this.container.discordRoles) {
                role.emoji = emojis.find(x => x.id === role.discordEmojiId);
            }
        } else {
            this.isNew = true;
            this.container.discordServerId = this.discordService.getLocalServerId();
        }
    }

    selectedRoleChanged() {
        if (!this.container?.discordRoles?.find(x => x.discordRoleId === this.selectedRole.id)) {
            this.container.discordRoles.push({
                discordRoleId: this.selectedRole.id,
                name: this.selectedRole.name,
                description: '',
                discordServerId: this.discordService.getLocalServerId()
            })
        }
    }

    async putContainer() {
        try {
            for (let role of this.container.discordRoles) {
                if (!role.emoji) continue;
                role.discordEmojiId = role.emoji.id;
            }
            if (this.isNew) {
                await this.discordService.createAutoroleContainer(this.container);
            } else {
                await this.discordService.updateAutoroleContainer(this.container);
            }
            toast(`Auto Role Container Successfully ${this.isNew ? 'Created' : 'Updated'}`, {severity: "success"});
            this.router.navigateBack();
        } catch(e) {
            toast(`Failed to update Auto Role Container.`, {severity: "error"});
            console.log(e);
        }
    }

    removeRole(index) {
        this.container.discordRoles.splice(index, 1);
    }
}
