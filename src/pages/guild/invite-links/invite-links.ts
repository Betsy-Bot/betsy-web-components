import {inject} from "aurelia-framework";
import {toast} from "lets-toast";
import {EventAggregator} from "aurelia-event-aggregator";
import {DiscordService} from "../../../services/discord-service";

@inject(EventAggregator, DiscordService)
export class InviteLinks {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService) {
    }

    guildId: string;
    channels;
    guild;
    params;
    featureActive;

    activate(params) {
        this.params = params;
    }

    async attached() {
        this.guildId = this.params.guildId as string;
        [this.guild] = await Promise.all([
             this.discordService.getDiscordServerInformation(this.guildId)
        ])
        this.featureActive = this.guild.activeFeatures.includes(this.discordService.BLOCK_INVITES);
    }

    async save() {
        await this.discordService.setAuditLogChannelId(this.guildId, this.guild.auditLogChannelId);
        toast("Updated audit log channel");
    }

    async toggleFeature() {
        if (this.featureActive) {
            this.guild.activeFeatures.push(this.discordService.BLOCK_INVITES);
            await this.discordService.setActiveFeaturesForDiscord(this.guildId, this.guild.activeFeatures);
        } else {
            this.guild.activeFeatures = this.guild.activeFeatures.filter(x => x !== this.discordService.BLOCK_INVITES);
            await this.discordService.setActiveFeaturesForDiscord(this.guildId, this.guild.activeFeatures);
        }
        toast(this.featureActive ? "Toggled feature on" : "Toggled feature off");
    }
}
