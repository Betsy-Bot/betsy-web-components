import { bindable, containerless, ICustomElementViewModel, inject } from "aurelia";
import { IRouter } from "@aurelia/router-lite";

import { botClientId,redirectUrl } from "../../../environment";
import { DiscordService } from "../../../services/discord-service";
import { WebhookService } from "../../../services/websocket-service";

import './server-card.scss';

import { toast } from "lets-toast";

@containerless()
@inject(WebhookService, DiscordService, IRouter)
export class ServerCard implements ICustomElementViewModel {
    constructor(private webhookService: WebhookService, private discordServerService: DiscordService, private router: IRouter) {
    }
    @bindable server;
    @bindable hideButton;
    @bindable forceGo;
    loading: boolean;

    get serverText() {
        const matches = this.server.name.match(/\b(\w)/g);
        const acronym = matches.join('').toString();
        return acronym.length > 4 ? acronym.slice(0, 4) : acronym;
    }

    async handleServerInvite() {
        this.loading = true;
        try {
            if (await this.discordServerService.setupServer(this.server.id)) {
                toast("It appears your server is already invited. Taking you there");
                return await this.router.load(`guild/${this.server.id}/dashboard`)
            }

            await this.discordServerService.createServer(this.server.id);

            this.openServerInvitePopup();
        } catch(e) {
            toast(e, { severity: 'error' });
            this.loading = false;
        }
    }

    openServerInvitePopup() {
        window.open(
            `https://discord.com/api/oauth2/authorize?client_id=${botClientId()}&permissions=8&redirect_uri=${redirectUrl()}&scope=bot%20applications.commands&guild_id=${this.server.id}`,
            'popup',
            'width=600, height=900');
        return false;
    }
}
