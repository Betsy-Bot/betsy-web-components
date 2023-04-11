import {IEventAggregator} from "aurelia";
import {DiscordService} from "../../../../services/discord-service";
import {inject} from "aurelia";
import {toast} from "lets-toast";
import {IRouteViewModel, route, Router} from "@aurelia/router-lite";

@route({
    path: "tracked-messages",
    title: "Tracked Messages",
})
@inject(IEventAggregator, DiscordService, Router)
export class TrackedMessages implements IRouteViewModel {
    constructor(
        private eventAggregator: IEventAggregator,
        private discordService: DiscordService,
        private router: Router
    ) {
    }

    guildId: string;
    messages;
    featureActive;

    async attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
        [this.messages] = await Promise.all([
            await this.discordService.getTrackedMessages(this.guildId),
        ]);
    }

    async updateActive(message) {
        const foundCommandIndex = this.messages.findIndex(
            (x) => x.name === message.name
        );
        this.messages[foundCommandIndex].active =
            !!this.messages[foundCommandIndex].active;
        if (foundCommandIndex >= 0) {
            await this.discordService.updateDiscordMessage(
                this.messages[foundCommandIndex]
            );
            toast(`Active status has been updated for /${message.name}`, {
                severity: "success",
            });
        } else {
            toast("Error", {severity: "error"});
        }
    }

    goTo(message) {
        this.router.load(
            `/guild/${this.guildId}/messages/tracked-messages/${message.id}`
        );
    }
}
