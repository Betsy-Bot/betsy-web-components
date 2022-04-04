import {EventAggregator} from "aurelia-event-aggregator";
import {DiscordService} from "services/discord-service";
import {Router} from "aurelia-router";
import {inject} from "aurelia-framework";
import {toast} from "lets-toast";

@inject(EventAggregator, DiscordService, Router)
export class CreateTicketMessage {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }

    guildId: string;
    guild;

    featureActive;

    request = {
        discordChannelId: '',
        discordCategoryId: '',
        message: {},
    };

    async activate(params) {
        this.guildId = params.guildId as string;
    }

    async attached() {
        [this.guild] = await Promise.all([
            await this.discordService.getDiscordServerInformation(this.guildId)
        ])
        this.featureActive = this.guild.activeFeatures.includes(this.discordService.SUPPORT_TICKETS);
    }

    async toggleFeature() {
        if (this.featureActive) {
            this.guild.activeFeatures.push(this.discordService.SUPPORT_TICKETS);
            await this.discordService.setActiveFeaturesForDiscord(this.guildId, this.guild.activeFeatures);
        } else {
            this.guild.activeFeatures = this.guild.activeFeatures.filter(x => x !== this.discordService.SUPPORT_TICKETS);
            await this.discordService.setActiveFeaturesForDiscord(this.guildId, this.guild.activeFeatures);
        }
        toast(this.featureActive ? "Toggled feature on" : "Toggled feature off");
    }

    async setupSupportTicket() {
        try {
            await this.discordService.setupSupportTicketMessage(this.guildId, this.request);
            toast("Created support message!", {severity: "success"})
            this.router.navigate(`guilds/${this.guildId}/support-tickets`)
        } catch(e) {
            toast("Failed to setup support ticket creation message", {severity: "error"});
            throw e;
        }
    }
}
