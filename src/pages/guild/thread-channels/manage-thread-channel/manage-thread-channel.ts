import { IEventAggregator } from "aurelia";
import { DiscordService } from "../../../../services/discord-service";
import { IRouteViewModel, Router } from "@aurelia/router-lite";
import { toast } from "lets-toast";
import { bindable, inject } from "aurelia";
@inject(IEventAggregator, DiscordService, Router)
export class ManageThreadChannel implements IRouteViewModel {
    constructor(
        private eventAggregator: IEventAggregator,
        private discordService: DiscordService,
        private router: Router
    ) {}

    loading(params) {
        this.guildId = params.guildId;
        this.threadChannelId = params.threadChannelId;
    }

    guildId: string;
    @bindable threadChannel;
    threadChannelId;
    isNew: boolean;
    answers = [];
    option = {
        label: "",
        description: "",
        value: "",
        emoji: {},
    };
    threadChannelTemplate = {
        name: "",
        discordServerId: "",
        type: 3,
        active: true,
    };
    tab = "settings";

    async attached() {
        if (!this.threadChannelId || this.threadChannelId == 0) {
            this.isNew = true;
            this.threadChannel = this.threadChannelTemplate;
        } else {
            this.threadChannel =
                await this.discordService.getDiscordThreadChannelById(
                    this.threadChannelId
                );
        }
        this.threadChannelTemplate.discordServerId =
            this.discordService.getLocalGuild().id;
    }

    async save() {
        try {
            if (this.isNew) {
                this.threadChannel =
                    await this.discordService.createDiscordThreadChannels(
                        this.threadChannel
                    );
            } else {
                this.threadChannel =
                    await this.discordService.updateDiscordThreadChannel(
                        this.threadChannel
                    );
            }
            toast(`Thread Channel ${this.isNew ? "Created" : "Updated"}!`);
        } catch (e) {
            console.log(e);
            toast("Failed to update thread channel", { severity: "error" });
        }
    }

    async deleteThreadChannel(event) {
        if (event.detail.action == "ok") {
            try {
                await this.discordService.deleteDiscordThreadChannelById(
                    this.threadChannel.id
                );
                toast("Deleted thread channel!", { severity: "success" });
                //this.router.back();
            } catch (e) {
                toast("Failed to delete thread channel", { severity: "error" });
                throw e;
            }
        }
    }
}
