import { IEventAggregator } from "aurelia";
import { DiscordService } from "../../../../../services/discord-service";
import { IRouteViewModel, route, Router } from "@aurelia/router-lite";
import { toast } from "lets-toast";
import { bindable, inject } from "aurelia";

@route({
    path: "tracked-messages/:messageId",
    title: "Manage Tracked Message",
})
@inject(IEventAggregator, DiscordService, Router)
export class ManageTrackedMessage implements IRouteViewModel {
    constructor(
        private eventAggregator: IEventAggregator,
        private discordService: DiscordService,
        private router: Router
    ) {}

    loading(params) {
        this.messageId = params.messageId;
    }

    guildId: string;
    @bindable message;
    messageId;
    isNew;
    messageTemplate = {
        name: null,
        discordMessage: {
            message: {
                content: "",
                embeds: [],
            },
        },
    };
    confirmDeleteDialog: HTMLElement;

    async attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
        if (!this.messageId || this.messageId == 0) {
            this.isNew = true;
            this.message = this.messageTemplate;
        } else {
            this.message = await this.discordService.getTrackedMessage(
                this.guildId,
                this.messageId
            );
        }
    }

    copy() {
        this.isNew = true;
        this.message.id = undefined;
        this.message.name = undefined;
        this.message.discordMessage.id = undefined;
    }

    async save() {
        try {
            if (this.isNew) {
                await this.discordService.createTrackedMessage(
                    this.guildId,
                    this.message
                );
                toast("Tracked Message Created!");
                this.router.load(
                    `/guild/${this.guildId}/messages/tracked-messages`
                );
            } else {
                this.message = await this.discordService.updateTrackedMessage(
                    this.message
                );
                toast("Tracked Message Updated!");
            }
        } catch (e) {
            console.log(e);
            toast("Failed to create message", { severity: "error" });
        }
    }

    async deleteItem(event) {
        if (event.detail.action == "ok") {
            try {
                await this.discordService.deleteDiscordTrackedMessageById(
                    this.message.id
                );
                toast("Deleted thread channel!", { severity: "success" });
            } catch (e) {
                toast("Failed to delete thread channel", { severity: "error" });
                throw e;
            }
        }
    }
}
