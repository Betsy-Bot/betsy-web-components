import {EventAggregator} from "aurelia-event-aggregator";
import {DiscordService} from "services/discord-service";
import {inject} from "aurelia-framework";
import {toast} from "lets-toast";
import {Router} from "aurelia-router";

@inject(EventAggregator, DiscordService, Router)
export class TrackedMessage {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }

    guildId: string;
    messages;

    featureActive;

    async activate(params) {
        this.guildId = params.guildId as string;
    }

    async attached() {
        [this.messages] = await Promise.all([
            await this.discordService.getTrackedMessages(this.guildId)
        ])
    }

    async updateActive(message) {
        let foundCommandIndex = this.messages.findIndex(x => x.name === message.name);
        this.messages[foundCommandIndex].active = !!this.messages[foundCommandIndex].active;
        if (foundCommandIndex >= 0) {
            await this.discordService.updateDiscordMessage(this.messages[foundCommandIndex]);
            toast(`Active status has been updated for /${message.name}`, {severity: "success"})
        } else {
            toast("Error", {severity: "error"})
        }
    }

    goTo(message) {
        this.router.navigate(`/guild/${this.guildId}/messages/tracked-messages/${message.id}`)
    }
}
