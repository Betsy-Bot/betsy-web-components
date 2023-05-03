import {
    bindable, containerless,
    ICustomElementViewModel,
    inject,
} from "aurelia";

import cow from "../../../images/logo.png";
import { DiscordService } from "../../../services/discord-service";

import "./discord-message-preview.scss";

@containerless()
@inject(DiscordService)
export class DiscordMessagePreview implements ICustomElementViewModel {
    constructor(private discordService: DiscordService) {}

    attached() {
        this.discordGuild = this.discordService.getLocalGuild();
    }
    cow = cow;

    @bindable message;
    @bindable title;
    @bindable first = true;
    discordGuild;

    get currentTime() {
        return new Intl.DateTimeFormat("en", {
            dateStyle: "long",
            timeStyle: "short",
        }).format(new Date());
    }
}
