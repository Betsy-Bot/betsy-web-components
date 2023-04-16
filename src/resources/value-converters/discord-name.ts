import { DiscordService } from "../../services/discord-service";
import { inject } from "aurelia";
import { PLATFORM } from "aurelia";

@inject(DiscordService)
export class DiscordNameValueConverter {
    constructor(private discordService: DiscordService) {}
    public async toView(value: any) {
        if (!value) {
            return;
        }
        let member = await this.discordService.getGuildMember(value);
        if (!member?.user?.username) {
            return value;
        }
        return member.user.username;
    }
}
