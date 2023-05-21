import { IEventAggregator } from "aurelia";
import { bindable, inject } from "aurelia";
import { IRouter,IRouteViewModel, route } from "@aurelia/router-lite";

import { DiscordService } from "../../../../services/discord-service";

import { toast } from "lets-toast";

@route({
    path: "thread-channels/:threadChannelId",
    title: "Manage Thread Channel",
})
@inject(IEventAggregator, DiscordService, IRouter)
export class ManageThreadChannel implements IRouteViewModel {
    constructor(
        private eventAggregator: IEventAggregator,
        private discordService: DiscordService,
        private router: IRouter
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
            await this.router.load("../thread-channels", { context: this });
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
                await this.router.load("../thread-channels", { context: this });
            } catch (e) {
                toast("Failed to delete thread channel", { severity: "error" });
                throw e;
            }
        }
    }
}
