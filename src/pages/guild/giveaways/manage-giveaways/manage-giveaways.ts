import {EventAggregator} from "aurelia-event-aggregator";
import {DiscordService} from "services/discord-service";
import {Router} from "aurelia-router";
import {toast} from "lets-toast";
import {bindable, inject} from "aurelia-framework";

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
    giveawayTemplate = {
        name: '',
        discordServerId: '',
        type: 3,
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
            toast('Failed to create giveaway', {severity: 'error'})
        }
    }
}
