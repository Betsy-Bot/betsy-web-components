import {inject, bindable} from "aurelia";
import { WebhookService } from "../../../services/websocket-service";
import { DiscordService } from "../../../services/discord-service";
import {toast} from "lets-toast";

@inject(WebhookService, DiscordService)
export class ServerCard {
    constructor(private webhookService: WebhookService, private discordServer: DiscordService) {
    }
    @bindable() server;
    @bindable() hideButton;
    connection: any;
    loading: boolean;

    getServerText() {
        const matches = this.server.name.match(/\b(\w)/g);
        const acronym = matches.join('').toString();
        return acronym.length > 4 ? acronym.slice(0, 4) : acronym;
    }

    async handleServerInvite() {
        this.loading = true;
        try {
            await this.discordServer.createServer(this.server.id);
            this.connection = this.webhookService.subscribeToGuildInvite();
            await this.connection.start();
            this.connection.on('BotInvited', async(payload) => {
                if (payload === this.server.id) {
                    console.log('lets go to the server!');
                    this.loading = false;
                }
            });

            //this.openServerInvitePopup();
        } catch(e) {
            toast(e, {severity: 'error'});
            this.loading = false;
        }
    }

    openServerInvitePopup() {
        window.open(
            `https://discord.com/api/oauth2/authorize?client_id=943260131599220856&permissions=0&redirect_uri=http%3A%2F%2Flocalhost%3A9500%2Fguild-create&scope=bot%20applications.commands&guild_id=${this.server.id}`,
            'popup',
            'width=600, height=900');
        return false;
    }
}
