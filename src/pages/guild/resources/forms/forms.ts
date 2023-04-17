import { inject } from "aurelia";
import { DiscordService } from "../../../../services/discord-service";
import { IRouteViewModel, route } from "@aurelia/router-lite";

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

    // goToForm(item) {
    //     this.router.load(`/guild/${this.guildId}/resources/forms/${item.id}`);
    // }
}
