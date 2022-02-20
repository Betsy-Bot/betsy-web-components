import { bindable, inject, IRouter, IEventAggregator } from 'aurelia';
import { SessionService } from "../../../services/session-service";

@inject(SessionService)
export class Navigation {
    constructor(private sessionService: SessionService, @IRouter private router: IRouter, @IEventAggregator readonly ea: IEventAggregator) {
    }

    @bindable() user: any;
    drawer;
    guildId: any;

    expandOptions = {
        customCommands: true,
        moderation: true
    }

    openSection(sectionName){
        this.expandOptions[sectionName] = !this.expandOptions[sectionName];
    }

    async handleServerChange(event: any) {
        this.guildId = event?.detail?.value;
        await this.router.load(`guild/${this.guildId}`);
    }

    bound() {
        this.ea.subscribe('user-updated', payload => {
            this.user = payload;
        });
        this.ea.subscribe('guild-updated', payload => {
            this.guildId = payload;
        });
    }

    attached() {
        this.drawer.open = this.sessionService.getStorageItem(SessionService.SIDEBAR_STATUS_KEY, true);
    }

    async toggleSidebar() {
        const newDrawerStatus = !this.drawer.open;

        this.drawer.open = newDrawerStatus;

        this.sessionService.saveStorageItem(SessionService.SIDEBAR_STATUS_KEY, String(newDrawerStatus));
    }

    async logout() {
        await this.sessionService.logout();

        await this.router.load('/home');
    }

    getServerName(id: string) {
        return
    }
}
