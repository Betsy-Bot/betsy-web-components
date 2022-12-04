import {bindable, inject} from "aurelia-framework";
import {DiscordService} from "services/discord-service";

@inject(DiscordService)
export class MessageResourceSelector {
    constructor(private discordService: DiscordService) {
    }
    @bindable selectedMessage: string;
    @bindable label;
    @bindable required: boolean = false;

    messages;

    async attached() {
        this.messages = await this.discordService.getResourceMessagesForGuild(this.discordService.getLocalDiscordGuildId());
    }
}
