import {EventAggregator} from "aurelia-event-aggregator";
import {DiscordService} from "../../../services/discord-service";
import {Router} from "aurelia-router";
import {toast} from "lets-toast";
import {inject} from "aurelia-framework";

@inject(EventAggregator, DiscordService, Router)
export class ActionLog {
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

    MESSAGE_EDIT_LOGGING = "MessageEdits";
    MESSAGE_DELETE_LOGGING = "MessageDeletes";

    actionLogItems = [
        {
            value: this.MESSAGE_EDIT_LOGGING,
            label: 'Message Edits',
            description: 'Anytime a message is updated the previous and new message will be logged.',
            active: false
        },
        {
            value: this.MESSAGE_DELETE_LOGGING,
            label: 'Message Deletes',
            description: 'Anytime a message is deleted the deleted message content will be logged.',
            active: false
        }
    ]

    featureActive;

    async activate(params) {
        this.guildId = params.guildId as string;
    }

    async attached() {
        [this.guild] = await Promise.all([
            await this.discordService.getDiscordServerInformation(this.guildId)
        ])
        this.featureActive = this.guild.activeFeatures.includes(this.discordService.AUDIT_LOG);
        for (let feature of this.guild.activeAuditLogFeatures) {
            let index = this.actionLogItems.findIndex(x => x.value === feature);
            this.actionLogItems[index].active = true;
        }
    }

    async toggleFeature() {
        if (this.featureActive) {
            this.guild.activeFeatures.push(this.discordService.AUDIT_LOG);
            await this.discordService.setActiveFeaturesForDiscord(this.guildId, this.guild.activeFeatures);
        } else {
            this.guild.activeFeatures = this.guild.activeFeatures.filter(x => x !== this.discordService.AUDIT_LOG);
            await this.discordService.setActiveFeaturesForDiscord(this.guildId, this.guild.activeFeatures);
        }
        toast(this.featureActive ? "Toggled feature on" : "Toggled feature off");
    }

    isFeatureOn(value) {
        return this.guild.activeAuditLogFeatures.includes(value);
    }

    async toggleActionFeature(feature) {
        if (!this.isFeatureOn(feature.value)) {
            this.guild.activeAuditLogFeatures.push(feature.value);
        } else {
            this.guild.activeAuditLogFeatures = this.guild.activeAuditLogFeatures.filter(x => x !== feature.value);
        }
        await this.discordService.setActiveAuditFeaturesForDiscord(this.guildId, this.guild.activeAuditLogFeatures);
        toast(this.editActive ? `Toggled logging on for ${feature.label}` : `Toggled logging off for ${feature.label}`);
    }

    async updateAuditLogChannel() {
        await this.discordService.setAuditLogChannelId(this.guildId, this.guild.auditLogChannelId);
        toast("Updated audit log channel");
    }
}
