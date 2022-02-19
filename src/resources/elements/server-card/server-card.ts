import {bindable} from "aurelia";

export class ServerCard {
    @bindable() server;

    getServerText() {
        const matches = this.server.name.match(/\b(\w)/g);
        const acronym = matches.join('').toString();
        return acronym.length > 4 ? acronym.slice(0, 4) : acronym;
    }

    openServerInvitePopup() {
        window.open(
            `https://discord.com/api/oauth2/authorize?client_id=943260131599220856&permissions=0&redirect_uri=http%3A%2F%2Flocalhost%3A9500%2Fguild-create&scope=bot%20applications.commands&guild_id=${this.server.id}`,
            'popup',
            'width=600, height=900');
        return false;
    }
}
