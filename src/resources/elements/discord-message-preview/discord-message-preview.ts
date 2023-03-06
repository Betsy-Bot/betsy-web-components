import { bindable, inject } from "aurelia-framework";
import './discord-message-preview.scss';
import { DiscordService } from "../../../services/discord-service";

@inject(DiscordService)
export class DiscordMessagePreview {
    constructor(private discordService: DiscordService) {

    }

    attached() {
        this.discordGuild = this.discordService.getLocalGuild();
    }

    @bindable message;
    @bindable first = true;
    discordGuild;

    get currentTime() {
        return new Intl.DateTimeFormat('en', { dateStyle: 'long', timeStyle: 'short' }).format(new Date());
    }
}
