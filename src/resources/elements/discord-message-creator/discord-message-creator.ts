import {bindable} from 'aurelia';

export class DiscordMessageCreator {
    @bindable message;
    activeTab: string = 'message';


    bound() {
       console.log('message', this.message);
    }

    selectTab(tab) {
        this.activeTab = tab;
    }
}