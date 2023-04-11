import {bindable, ICustomElementViewModel, inject} from "aurelia";
import { DiscordService } from "../../../services/discord-service";

@inject(DiscordService)
export class MessageResourceSelector implements ICustomElementViewModel {
    constructor(private discordService: DiscordService) {
    }
    @bindable selectedMessage: string;
    @bindable label;
    @bindable required = false;

    messages;

    async attached() {
        this.messages = await this.discordService.getResourceMessagesForGuild(this.discordService.getLocalDiscordGuildId());
    }
}
