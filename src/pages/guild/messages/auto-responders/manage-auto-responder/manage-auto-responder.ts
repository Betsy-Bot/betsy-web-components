import { IEventAggregator } from "aurelia";
import { DiscordService } from "../../../../../services/discord-service";
import { IRouteViewModel, route, IRouter } from "@aurelia/router-lite";
import { toast } from "lets-toast";
import { bindable, inject, observable } from "aurelia";

@route({
    path: "auto-responders/:responderId",
    title: "Manage Auto Responder",
})
@inject(IEventAggregator, DiscordService, IRouter)
export class ManageAutoResponder implements IRouteViewModel {
    constructor(
        private eventAggregator: IEventAggregator,
        private discordService: DiscordService,
        private router: IRouter
    ) {}

    loading(params) {
        this.guildId = params.guildId;
        this.responderId = params.responderId;
    }

    params;
    guildId: string;
    @bindable responder;
    phrase;
    responderId;
    isNew: boolean;
    tab = "settings";
    @observable selectedIgnoreChannelId;
    @observable selectedWhitelistChannelId;
    @observable selectedWhitelistCategoryId;
    responderTemplate = {
        name: "",
        discordServerId: "",
        phrases: [],
        type: 0,
        ignoredChannels: [],
        discordMessage: {
            message: {},
        },
    };
    types = [
        {
            value: 0,
            label: "Reply Message",
        },
        {
            value: 1,
            label: "DM Message",
        },
        {
            value: 2,
            label: "Channel Message",
        },
    ];

    async attached() {
        if (!this.responderId || this.responderId == 0) {
            this.isNew = true;
            this.responder = this.responderTemplate;
        } else {
            this.responder = await this.discordService.getResponderById(
                this.responderId
            );
        }
        this.responderTemplate.discordServerId =
            this.discordService.getLocalGuild().id;
    }

    async save() {
        try {
            if (this.isNew) {
                this.responder = await this.discordService.createAutoResponder(
                    this.responder
                );
                await this.router.load("../auto-responders", { context: this });
            } else {
                this.responder = await this.discordService.updateAutoResponder(
                    this.responder
                );
            }
            toast(`Responder ${this.isNew ? "Created" : "Updated"}!`);
        } catch (e) {
            console.log(e);
            toast("Failed to create message", { severity: "error" });
        }
    }

    async addPhrase() {
        if (!this.responder.phrases) {
            this.responder.phrases = [];
        }
        this.responder.phrases.push({ value: this.phrase });
    }

    async removePhrase(index) {
        this.responder.phrases.splice(index, 1);
    }

    async selectedIgnoreChannelIdChanged() {
        if (!this.responder.ignoredChannels) {
            this.responder.ignoredChannels = [];
        }
        this.responder.ignoredChannels.push(this.selectedIgnoreChannelId);
    }

    async removeIgnoredChannel(index) {
        this.responder.ignoredChannels.splice(index, 1);
    }

    async selectedWhitelistChannelIdChanged() {
        if (!this.responder.whitelistedChannels) {
            this.responder.whitelistedChannels = [];
        }
        this.responder.whitelistedChannels.push(
            this.selectedWhitelistChannelId
        );
    }

    async removeWhitelistedChannel(index) {
        this.responder.whitelistedChannels.splice(index, 1);
    }

    async selectedWhitelistCategoryIdChanged() {
        if (!this.responder.whitelistedCategories) {
            this.responder.whitelistedCategories = [];
        }
        this.responder.whitelistedCategories.push(
            this.selectedWhitelistCategoryId
        );
    }

    async removeWhitelistedCategory(index) {
        this.responder.whitelistedCategories.splice(index, 1);
    }
}
