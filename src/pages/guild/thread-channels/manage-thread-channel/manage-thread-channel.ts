import {EventAggregator} from "aurelia-event-aggregator";
import {DiscordService} from "services/discord-service";
import {Router} from "aurelia-router";
import {toast} from "lets-toast";
import {bindable, inject} from "aurelia-framework";
import {DiscordComponentType} from "../../../../services/models/discord";

@inject(EventAggregator, DiscordService, Router)
export class ManageThreadChannel {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }

    activate(params) {
        this.guildId = params.guildId;
        this.threadChannelId = params.threadChannelId;
    }

    guildId: string;
    @bindable threadChannel;
    threadChannelId;
    isNew: boolean;
    answers = [];
    option = {
        label: '',
        description: '',
        value: '',
        emoji: {}
    }
    threadChannelTemplate = {
        name: '',
        discordServerId: '',
        type: 3,
        active: true,
    }
    tab = "settings";

    async attached() {
        if (!this.threadChannelId || this.threadChannelId == 0) {
            this.isNew = true;
            this.threadChannel = this.threadChannelTemplate;
        } else {
            this.threadChannel = await this.discordService.getDiscordThreadChannelById(this.threadChannelId);
        }
        this.threadChannelTemplate.discordServerId = this.discordService.getLocalGuild().id;
    }

    async save() {
        try {
            if (this.isNew) {
                this.threadChannel = await this.discordService.createDiscordThreadChannels(this.threadChannel);
            } else {
                this.threadChannel = await this.discordService.updateDiscordThreadChannel(this.threadChannel);
            }
            toast(`Thread Channel ${this.isNew ? 'Created' : 'Updated'}!`);
            this.router.navigateBack();
        } catch(e) {
            console.log(e);
            toast('Failed to create giveaway', {severity: 'error'})
        }
    }

    async deleteThreadChannel(event) {
        if (event.detail.action == 'ok') {
            try {
                await this.discordService.deleteDiscordThreadChannelById(this.threadChannel.id);
                toast("Deleted giveaway message!", {severity: "success"})
                this.router.navigateBack();
            } catch(e) {
                toast("Failed to delete giveaway", {severity: "error"});
                throw e;
            }
        }
    }
}
