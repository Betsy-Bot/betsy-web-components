import {EventAggregator} from "aurelia-event-aggregator";
import {DiscordService} from "../../../../services/discord-service";
import {Router} from "aurelia-router";
import {toast} from "lets-toast";

export class Twitch {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }

    guildId: string;
    commands;
    guild;

    featureActive;

    async activate(params) {
        this.guildId = params.guildId as string;
    }

    async attached() {
        [this.commands, this.guild] = await Promise.all([
            await this.discordService.getResponseMessagesForGuild(this.guildId),
            await this.discordService.getDiscordServerInformation(this.guildId)
        ])
        this.featureActive = this.guild.activeFeatures.includes(this.discordService.TWITCH_SUBSCRIPTIONS);
    }

    async updateActive(command) {
        let foundCommandIndex = this.commands.findIndex(x => x.name === command.name);
        if (foundCommandIndex >= 0) {
            await this.discordService.toggleDiscordCommandActive(this.guildId, command.discordApplicationCommandId, this.commands[foundCommandIndex].active);
            toast(`Active status has been updated for /${command.name}`, {severity: "success"})
        } else {
            toast("Error", {severity: "error"})
        }
    }

    goToCommand(command) {
        this.router.navigate(`/guild/${this.guildId}/response-message/${command.discordApplicationCommandId}`)
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
}