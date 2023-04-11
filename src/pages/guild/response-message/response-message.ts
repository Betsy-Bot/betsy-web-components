import {inject} from "aurelia";
import {DiscordService} from "../../../services/discord-service";
import {toast} from "lets-toast";
import {IEventAggregator} from "aurelia";
import {IRouteViewModel, route, Router} from "@aurelia/router-lite";

@route({
    path: "response-messages",
    title: "Response Messages",
})
@inject(IEventAggregator, DiscordService, Router)
export class ResponseMessage implements IRouteViewModel {
    constructor(
        private eventAggregator: IEventAggregator,
        private discordService: DiscordService,
        private router: Router
    ) {
    }

    guildId: string;
    commands;
    guild;

    featureActive;

    async attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
        [this.commands, this.guild] = await Promise.all([
            await this.discordService.getResponseMessagesForGuild(this.guildId),
            await this.discordService.getDiscordServerInformation(this.guildId),
        ]);
        this.featureActive = this.guild.activeFeatures.includes(
            this.discordService.RESPONSE_MESSAGES
        );
    }

    async updateActive(command) {
        const foundCommandIndex = this.commands.findIndex(
            (x) => x.name === command.name
        );
        if (foundCommandIndex >= 0) {
            await this.discordService.toggleDiscordCommandActive(
                this.guildId,
                command.id,
                this.commands[foundCommandIndex].active
            );
            toast(`Active status has been updated for /${command.name}`, {
                severity: "success",
            });
        } else {
            toast("Error", {severity: "error"});
        }
    }

    goToCommand(command) {
        this.router.load(
            `/guild/${this.guildId}/response-message/${command.id}`
        );
    }

    async toggleFeature() {
        if (this.featureActive) {
            this.guild.activeFeatures.push(
                this.discordService.RESPONSE_MESSAGES
            );
            await this.discordService.setActiveFeaturesForDiscord(
                this.guildId,
                this.guild.activeFeatures
            );
        } else {
            this.guild.activeFeatures = this.guild.activeFeatures.filter(
                (x) => x !== this.discordService.RESPONSE_MESSAGES
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
}
