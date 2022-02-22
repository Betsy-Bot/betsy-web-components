import {bindable} from 'aurelia';

export class DiscordMessageCreator {
    @bindable message;
    activeTab: string = 'message';

    bound() {
        if (!this.message) {
            this.message = {
                embeds: []
            }
        }
    }

    selectTab(tab) {
        if (tab === 'embed' && !this.message.embeds) {
            this.message.embeds = [
                { title: "My Embed Title" }
            ];
        }
        this.activeTab = tab;
    }
}