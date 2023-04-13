import { inject, observable } from "aurelia";
import { IRouteViewModel, Params, route, IRouter, IRouteContext } from "@aurelia/router-lite";

import { DiscordService } from "../../../../services/discord-service";
import {
    DiscordButtonStyle,
    DiscordComponentType,
} from "../../../../services/models/discord";

import { toast } from "lets-toast";

@route({
    path: "support-tickets/0",
    title: "Create",
})
@inject(DiscordService, IRouter, IRouteContext)
export class CreateTicketMessage implements IRouteViewModel {
    constructor(
        private discordService: DiscordService,
        private router: IRouter,
        private context: IRouteContext
    ) {}

    guildId: string;
    guild;

    featureActive;

    tab = "settings";
    @observable authorizedRole;

    request = {
        identifier: "",
        id: undefined,
        logChannelId: "",
        assignedRoles: [],
        initialMessage: {},
        closeButtonText: "Close",
        discordMessage: {
            discordChannelId: "",
            discordCategoryId: "",
            type: 1,
            message: {
                components: [
                    {
                        type: DiscordComponentType.ActionRow,
                        components: [
                            {
                                type: DiscordComponentType.Button,
                                label: "Create Ticket",
                                style: DiscordButtonStyle.Primary,
                            },
                        ],
                    },
                ],
            },
        },
    };

    didLoad = false;
    params;
    didBind = false;

    loading(params: Params) {
        const urlSearchParams = new URLSearchParams(window.location.search);
        this.params = Object.fromEntries(urlSearchParams.entries()) ?? {};
    }

    async attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
        [this.guild] = await Promise.all([
            await this.discordService.getDiscordServerInformation(this.guildId),
        ]);
        this.featureActive = this.guild.activeFeatures.includes(
            this.discordService.SUPPORT_TICKETS
        );
        if (this.params) {
           this.request = {...this.params}
        }
        this.didBind = true;
    }

    authorizedRoleChanged(newValue, oldvalue) {
        if (!this.request.assignedRoles) {
            this.request.assignedRoles = [];
        }
        this.request.assignedRoles.push(newValue.id);
    }

    async setupSupportTicket() {
        if (this.didLoad) {
            return;
        }
        try {
            this.didLoad = true;
            await this.discordService.setupSupportTicketMessage(
                this.guildId,
                this.request
            );
            toast("Created support message!", { severity: "success" });
            await this.router.load(`../support-tickets`, {context: this.context});
        } catch (e) {
            toast("Failed to setup support ticket creation message", {
                severity: "error",
            });
            throw e;
        } finally {
            this.didLoad = false;
        }
    }
}
