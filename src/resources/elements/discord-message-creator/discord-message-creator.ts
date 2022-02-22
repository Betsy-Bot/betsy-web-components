import {bindable} from 'aurelia';

export class DiscordMessageCreator {
    @bindable message;
    activeTab: string = 'message';

    logTab(event) {
        console.log(event);
    }

    selectTab(tab) {
        this.activeTab = tab;
    }
}