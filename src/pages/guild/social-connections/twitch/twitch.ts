import {DiscordService} from "../../../../services/discord-service";
import {Router} from "aurelia-router";
import {toast} from "lets-toast";
import {inject} from "aurelia-framework";

@inject(DiscordService, Router)
export class Twitch {
    constructor(private discordService: DiscordService, private router: Router) {
    }

    guildId: string;
    subscriptions;
    guild;

    featureActive;

    request = {
        twitchLogin: '',
        discordChannelId: ''
    };
    createDialog;
    deleteDialog;
    lastSelected;

    async activate(params) {
        this.guildId = params.guildId as string;
    }

    async attached() {
        [this.subscriptions, this.guild] = await Promise.all([
            await this.discordService.getTwitchSubscriptions(this.guildId),
            await this.discordService.getDiscordServerInformation(this.guildId)
        ])
        this.featureActive = this.guild.activeFeatures.includes(this.discordService.TWITCH_SUBSCRIPTIONS);
    }

    async updateActive(subscription) {
        let foundCommandIndex = this.subscriptions.findIndex(x => x.name === subscription.name);
        if (foundCommandIndex >= 0) {
            await this.discordService.toggleDiscordCommandActive(this.guildId, subscription.discordApplicationCommandId, this.subscriptions[foundCommandIndex].active);
            toast(`Active status has been updated for /${subscription.name}`, {severity: "success"})
        } else {
            toast("Error", {severity: "error"})
        }
    }

    handle(subscription) {
        this.router.navigate(`/guild/${this.guildId}/social-connections/twitch/${subscription.id}`)
    }

    async toggleFeature() {
        if (this.featureActive) {
            this.guild.activeFeatures.push(this.discordService.TWITCH_SUBSCRIPTIONS);
            await this.discordService.setActiveFeaturesForDiscord(this.guildId, this.guild.activeFeatures);
        } else {
            this.guild.activeFeatures = this.guild.activeFeatures.filter(x => x !== this.discordService.TWITCH_SUBSCRIPTIONS);
            await this.discordService.setActiveFeaturesForDiscord(this.guildId, this.guild.activeFeatures);
        }
        toast(this.featureActive ? "Toggled feature on" : "Toggled feature off");
    }

    handleCreateModal(event) {
        if (event.detail.action == 'ok') {
            if (!this.request.twitchLogin || !this.request.discordChannelId) {
                toast("Both the Twitch Username and Channel are required.");
                return;
            }
            try {
                const subscription = this.discordService.createTwitchSubscription(this.request, this.guildId)
                if (subscription) {
                    this.subscriptions.push(subscription);
                    toast("Twitch Go-Live Event Subscription Created.");
                } else {
                    toast("Failed to create twitch subscription. Contact Betsy Support");
                }
            } catch(e) {
                toast("Failed to create twitch subscription. Contact Betsy Support");
            }
        }
    }

    openDeleteDialog(item) {
        this.lastSelected = item;
        this.deleteDialog.open();
    }

    async handleDeleteModal(event) {
        if (this.lastSelected && event.detail.action == 'ok') {
            await this.discordService.deleteTwitchSubscription(this.lastSelected.id, this.guildId);
            const index = this.subscriptions.findIndex(x => x.id === this.lastSelected.id);
            this.subscriptions.splice(index, 1)
        }
    }
}
