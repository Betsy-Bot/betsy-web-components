import {
    bindable,
    customElement,
    ICustomElementViewModel,
    inject,
} from "aurelia";
import "./discord-message-preview.scss";
import { DiscordService } from "../../../services/discord-service";
import template from "./discord-message-preview.html";
import cow from "../../../images/cow.jpeg";

@customElement({
    name: "discord-message-preview",
    template: template,
    containerless: true,
})
@inject(DiscordService)
export class DiscordMessagePreview implements ICustomElementViewModel {
    constructor(private discordService: DiscordService) {}

    attached() {
        this.discordGuild = this.discordService.getLocalGuild();
    }
    cow = cow;

    @bindable message;
    @bindable first = true;
    discordGuild;

    get currentTime() {
        return new Intl.DateTimeFormat("en", {
            dateStyle: "long",
            timeStyle: "short",
        }).format(new Date());
    }
}
