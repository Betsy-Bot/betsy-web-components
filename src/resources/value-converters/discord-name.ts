import { inject } from "aurelia";

import { DiscordService } from "../../services/discord-service";

@inject(DiscordService)
export class DiscordNameValueConverter {
    constructor(private discordService: DiscordService) {}
    public async toView(value: any) {
        if (!value) {
            return;
        }
        const member = await this.discordService.getGuildMember(value);
        if (!member.user.username) {
            return value;
        }
        return member.user.username;
    }
}
