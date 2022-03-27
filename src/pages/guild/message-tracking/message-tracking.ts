import {EventAggregator} from "aurelia-event-aggregator";
import {DiscordService} from "../../../services/discord-service";
import {Router} from "aurelia-router";
import {toast} from "lets-toast";
import {inject} from "aurelia-framework";

@inject(EventAggregator, DiscordService, Router)
export class MessageTracking {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }

    guildId: string;
    guild;

    editActive;
    deleteActive;
    channelId;
    categoryId;

    request = {
        channelId: '',
        categoryId: '',
        message: {},
    };

    async activate(params) {
        this.guildId = params.guildId as string;
    }

    async attached() {
        [this.guild] = await Promise.all([
            await this.discordService.getDiscordServerInformation(this.guildId)
        ])
        this.editActive = this.guild.activeFeatures.includes(this.discordService.MESSAGE_EDIT_LOGGING);
        this.deleteActive = this.guild.activeFeatures.includes(this.discordService.MESSAGE_DELETE_LOGGING);
    }

    async toggleEditLoggingFeature() {
        if (this.editActive) {
            this.guild.activeFeatures.push(this.discordService.MESSAGE_EDIT_LOGGING);
            await this.discordService.setActiveFeaturesForDiscord(this.guildId, this.guild.activeFeatures);
        } else {
            this.guild.activeFeatures = this.guild.activeFeatures.filter(x => x !== this.discordService.MESSAGE_EDIT_LOGGING);
            await this.discordService.setActiveFeaturesForDiscord(this.guildId, this.guild.activeFeatures);
        }
        toast(this.editActive ? "Toggled feature on" : "Toggled feature off");
    }

    async toggleDeleteLoggingFeature() {
        if (this.deleteActive) {
            this.guild.activeFeatures.push(this.discordService.MESSAGE_DELETE_LOGGING);
            await this.discordService.setActiveFeaturesForDiscord(this.guildId, this.guild.activeFeatures);
        } else {
            this.guild.activeFeatures = this.guild.activeFeatures.filter(x => x !== this.discordService.MESSAGE_DELETE_LOGGING);
            await this.discordService.setActiveFeaturesForDiscord(this.guildId, this.guild.activeFeatures);
        }
        toast(this.editActive ? "Toggled feature on" : "Toggled feature off");
    }

    async updateAuditLogChannel() {
        await this.discordService.setAuditLogChannelId(this.guildId, this.guild.auditLogChannelId);
        toast("Updated audit log channel");
    }
}
