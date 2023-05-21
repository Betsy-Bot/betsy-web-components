import { inject } from "aurelia";
import { IRouteViewModel, route, Router } from "@aurelia/router-lite";

import { DiscordService } from "../../../../services/discord-service";

import { toast } from "lets-toast";

@route({
    path: "twitch",
    title: "Twitch",
})
@inject(DiscordService, Router)
export class Twitch implements IRouteViewModel {
    constructor(
        private discordService: DiscordService,
        private router: Router
    ) {}

    guildId: string;
    subscriptions;
    guild;

    featureActive;

    request = {
        twitchLogin: "",
        discordChannelId: "",
        type: "",
    };
    createDialog;
    deleteDialog;
    lastSelected;
    subscriptionTypes: string[] = [
        "stream.online",
        "stream.offline",
        "channel.follow",
        //"channel.update",
        //"channel.subscribe",
        //"channel.subscription.end",
        //"channel.subscription.gift",
        //"channel.subscription.message",
        ///"channel.hype_train.begin",
        ///"channel.hype_train.end",
        //"channel.poll.begin",
        //"channel.poll.progress",
        //"channel.poll.end",
        //"channel.prediction.begin",
        //"channel.prediction.progress",
        //"channel.prediction.lock",
        //"channel.prediction.end",
    ];

    async attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
        [this.subscriptions, this.guild] = await Promise.all([
            await this.discordService.getTwitchSubscriptions(this.guildId),
            await this.discordService.getDiscordServerInformation(this.guildId),
        ]);
        this.featureActive = this.guild.activeFeatures.includes(
            this.discordService.TWITCH_SUBSCRIPTIONS
        );
    }

    async updateActive(subscription) {
        const foundCommandIndex = this.subscriptions.findIndex(
            (x) => x.name === subscription.name
        );
        if (foundCommandIndex >= 0) {
            await this.discordService.toggleDiscordCommandActive(
                this.guildId,
                subscription.discordApplicationCommandId,
                this.subscriptions[foundCommandIndex].active
            );
            toast(`Active status has been updated for /${subscription.name}`, {
                severity: "success",
            });
        } else {
            toast("Error", { severity: "error" });
        }
    }

    handle(subscription) {
        this.router.load(
            `/guild/${this.guildId}/social-connections/twitch/${subscription.id}`
        );
    }

    async toggleFeature() {
        if (this.featureActive) {
            this.guild.activeFeatures.push(
                this.discordService.TWITCH_SUBSCRIPTIONS
            );
            await this.discordService.setActiveFeaturesForDiscord(
                this.guildId,
                this.guild.activeFeatures
            );
        } else {
            this.guild.activeFeatures = this.guild.activeFeatures.filter(
                (x) => x !== this.discordService.TWITCH_SUBSCRIPTIONS
            );
            await this.discordService.setActiveFeaturesForDiscord(
                this.guildId,
                this.guild.activeFeatures
            );
        }
        toast(
            this.featureActive ? "Toggled feature on" : "Toggled feature off"
        );
    }

    async handleCreateModal(event) {
        if (
            !this.request.twitchLogin ||
            !this.request.discordChannelId ||
            !this.request.type
        ) {
            toast("Both the Twitch Username and Channel are required.");
            return;
        }
        let subscription;
        try {
            subscription = await this.discordService.createTwitchSubscription(
                this.request,
                this.guildId
            );
            if (subscription) {
                this.subscriptions.push(subscription);
                toast("Twitch Go-Live Event Subscription Created.");
                this.createDialog.close("cancel");
            }
        } catch (e) {
            console.log(e);
        }
    }

    openDeleteDialog(item) {
        this.lastSelected = item;
        this.deleteDialog.open();
    }

    async handleDeleteModal(event) {
        if (this.lastSelected && event.detail.action == "ok") {
            await this.discordService.deleteTwitchSubscription(
                this.lastSelected.id,
                this.guildId
            );
            const index = this.subscriptions.findIndex(
                (x) => x.id === this.lastSelected.id
            );
            this.subscriptions.splice(index, 1);
        }
    }
}
