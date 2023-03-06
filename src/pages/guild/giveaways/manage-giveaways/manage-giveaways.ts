import { EventAggregator } from "aurelia-event-aggregator";
import { DiscordService } from "services/discord-service";
import { Router } from "aurelia-router";
import { toast } from "lets-toast";
import { bindable, inject, observable } from "aurelia-framework";
import { DiscordButtonStyle, DiscordComponentType } from "../../../../services/models/discord";

@inject(EventAggregator, DiscordService, Router)
export class ManageGiveaways {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }

    activate(params) {
        this.guildId = params.guildId;
        this.giveawayId = params.giveawayId;
    }

    guildId: string;
    @bindable giveaway;
    giveawayId;
    isNew: boolean;
    @observable role;
    giveawayTemplate = {
        name: '',
        discordServerId: '',
        type: 3,
        active: true,
        roles: [],
        winningMessage: {
            message: {
                embeds: [
                    {
                        title: "Congrats!",
                        color: 5726933
                    }
                ]
            }
        },
        containerMessage: {
            message: {
                embeds: [
                    {
                        title: "A new Giveaway has started!",
                        color: 5726933,
                        fields: [
                            {
                                name: "Prize",
                                value: ""
                            }
                        ]
                    }
                ],
                components: [
                    {
                        type: DiscordComponentType.ActionRow,
                        components: [{
                            type: DiscordComponentType.Button,
                            style: DiscordButtonStyle.Success,
                            custom_id: "GiveawayEnter",
                            label: "Enter"
                        }]
                    }
                ]
            }
        }
    }
    tab = "settings";

    async attached() {
        if (!this.giveawayId || this.giveawayId == 0) {
            this.isNew = true;
            this.giveaway = this.giveawayTemplate;
        } else {
            this.giveaway = await this.discordService.getGiveawayById(this.giveawayId);
        }
        this.giveawayTemplate.discordServerId = this.discordService.getLocalGuild().id;
    }

    async save() {
        try {
            if (this.isNew) {
                this.giveaway = await this.discordService.createGiveaway(this.giveaway);
            } else {
                this.giveaway = await this.discordService.updateGiveaway(this.giveaway);
            }
            toast(`Giveaway ${this.isNew ? 'Created' : 'Updated'}!`);
            this.router.navigateBack();
        } catch(e) {
            console.log(e);
            toast('Failed to create giveaway', { severity: 'error' })
        }
    }

    async deleteGiveaway(event) {
        if (event.detail.action == 'ok') {
            try {
                await this.discordService.deleteGiveawayById(this.giveaway.id);
                toast("Deleted giveaway message!", { severity: "success" })
                this.router.navigateBack();
            } catch(e) {
                toast("Failed to delete giveaway", { severity: "error" });
                throw e;
            }
        }
    }

    roleChanged() {
        if (!this.giveaway.roles) {
            this.giveaway.roles = [];
        }
        this.giveaway.roles.push({
            name: this.role.name,
            discordRoleId: this.role.id,
            numberOfEntries: 1
        })
    }

    deleteRole(index) {
        this.giveaway.roles.splice(index, 1);
    }

    cloneGiveaway() {
        this.giveaway.name = "";
        this.giveaway.participants = [];
        this.giveaway.id = undefined;
        this.giveaway.discordServer = undefined;
        this.giveaway.winningMessageId = undefined;
        this.giveaway.winningMessage.id = undefined
        this.giveaway.containerMessageId = undefined;
        this.giveaway.containerMessage.id = undefined;
        this.giveaway.ended = undefined;
        this.isNew = true;
        toast("Cloned Giveaway");
        this.router.navigate(`/guild/${this.guildId}/giveaways/0`)
    }
}
