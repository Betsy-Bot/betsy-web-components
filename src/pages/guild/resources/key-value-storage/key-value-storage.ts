import { inject } from "aurelia";
import { IRouteViewModel, route, Router } from "@aurelia/router-lite";

import { DiscordService } from "../../../../services/discord-service";

@route({
    path: "key-value-storage",
    title: "Key Value Storage",
})
@inject(DiscordService, Router)
export class KeyValueStorage implements IRouteViewModel {
    constructor(
        private discordService: DiscordService,
        private router: Router
    ) {}

    guildId: string;
    params;
    items = [];

    loading(params) {
        this.params = params;
        this.guildId = this.params.guildId;
    }

    async attached() {
        this.items = await this.discordService.getKeyValueCategories();
    }

    createFunction() {
        this.goToItem({ id: 0 });
    }

    goToItem(item) {
        this.router.load(
            `/guild/${this.guildId}/resources/key-value-storage/${item.id}`
        );
    }
}
