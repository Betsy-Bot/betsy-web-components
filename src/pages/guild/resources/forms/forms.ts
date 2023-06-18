import { inject } from "aurelia";
import { IRouteViewModel, route } from "@aurelia/router-lite";

import { DiscordService } from "../../../../services/discord-service";

@route({
    path: "forms",
    title: "forms",
})
@inject(DiscordService)
export class Forms implements IRouteViewModel {
    constructor(private discordService: DiscordService) {}

    guildId: string;
    params;
    forms;

    async attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
        this.forms = await this.discordService.getDiscordForms(this.guildId);
    }
}
