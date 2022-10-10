import {EventAggregator} from "aurelia-event-aggregator";
import {DiscordService} from "services/discord-service";
import {Router} from "aurelia-router";
import {toast} from "lets-toast";
import { bindable, inject, observable } from "aurelia-framework";

@inject(EventAggregator, DiscordService, Router)
export class ManageAutoResponder {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }

    activate(params) {
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
    @observable selectedChannelId;
    responderTemplate = {
        name: '',
        discordServerId: '',
        phrases: [],
        type: 0,
        ignoredChannels: [],
        discordMessage: {
            message: {

            }
        }
    }
    types = [
        {
            value: 0,
            label: "Reply Message"
        },
        {
            value: 1,
            label: "DM Message"
        },
        {
            value: 2,
            label: "Channel Message"
        }
    ]

    async attached() {
        if (!this.responderId || this.responderId == 0) {
            this.isNew = true;
            this.responder = this.responderTemplate;
        } else {
            this.responder = await this.discordService.getResponderById(this.responderId);
        }
        this.responderTemplate.discordServerId = this.discordService.getLocalGuild().id;
    }

    async save() {
        try {
            if (this.isNew) {
                this.responder = await this.discordService.createAutoResponder(this.responder);
            } else {
                this.responder = await this.discordService.updateAutoResponder(this.responder);
            }
            toast(`Responder ${this.isNew ? 'Created' : 'Updated'}!`);
            this.router.navigateBack();
        } catch (e) {
            console.log(e);
            toast('Failed to create message', {severity: 'error'})
        }
    }

    async addPhrase() {
        if (!this.responder.phrases) {
            this.responder.phrases = [];
        }
        this.responder.phrases.push({value: this.phrase});
    }

    async removePhrase(index) {
        this.responder.phrases.splice(index, 1)
    }


    async selectedChannelIdChanged() {
        if (!this.responder.ignoredChannels) {
            this.responder.ignoredChannels = [];
        }
        this.responder.ignoredChannels.push(this.selectedChannelId);
    }

    async removeIgnoredChannel(index) {
        this.responder.ignoredChannels.splice(index, 1)
    }
}
