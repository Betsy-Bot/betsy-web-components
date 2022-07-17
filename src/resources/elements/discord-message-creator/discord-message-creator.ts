import { bindable, inject } from 'aurelia-framework';
import {DiscordEmbed} from "../../../services/models/discord";
import { DiscordService } from "../../../services/discord-service";

@inject(DiscordService)
export class DiscordMessageCreator {
    constructor(private discordService: DiscordService) {
    }
    @bindable message;
    @bindable single;
    @bindable allowComponents: boolean;
    @bindable tab = 'message';
    @bindable selectedMessage;
    @bindable hideTemplate: boolean = false
    messages;

    async created() {
        this.messages = await this.discordService.getResourceMessagesForGuild(this.discordService.getLocalDiscordGuildId());
    }

    selectedMessageChanged() {
        if (this.selectedMessage?.message) {
            this.message = this.selectedMessage.message;
            this.selectedMessage = null;
        }
    }

    addEmbed() {
        if (!this.message.embeds) {
            this.message.embeds = [];
        }
        this.message.embeds.push(new DiscordEmbed())
    }

    deleteEmbed(index) {
        this.message.embeds.splice(index, 1)
    }

    get canCreateEmbed() {
        if (!this.single) {
            return !this.message.embeds || this.message.embeds.length < 10
        } else {
            return !this.message.embeds || this.message.embeds.length < 1
        }
    }
}
