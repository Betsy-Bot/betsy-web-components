import { inject } from "aurelia";
import { SessionService } from "../../services/session-service";
import { UserService } from "../../services/user-service";

@inject(SessionService, UserService)
export class Dashboard {
    constructor(private sessionService: SessionService, private userService: UserService) {
    }

    private user;
    private managedGuilds;
    private otherGuilds;

    async attached() {
        this.user = await this.sessionService.getUser();

        const userGuilds = await this.userService.getGuilds();
        for (const guild of userGuilds) {
            guild.icon_extension = guild.icon?.startsWith("a_") ? "gif" : "webp";
            guild.can_add = guild.owner || (guild.permissions & 0x8) == 0x8
        }

        this.managedGuilds = userGuilds.filter(g => g.can_add)
        this.otherGuilds = userGuilds.filter(g => !g.can_add)
    }
}
