import {route} from "@aurelia/router-lite";
import {inject} from 'aurelia';
import {DiscordService} from "../../../services/discord-service";

@route({
    path: "import-export",
    title: "Import / Export",
})
@inject(DiscordService)
export class ImportExport {
    features = ["MessageTemplates", "SupportTickets", "Forms"]
    selectedFeatures = [];

    constructor(private discordService: DiscordService) {
        this.selectedFeatures = [...this.features];
    }

    async handleExport() {
        console.log('export', this.selectedFeatures);
        const response = await this.discordService.exportTemplate(this.selectedFeatures);
        const jsonString = JSON.stringify(response, null, 4);
        const blob = new Blob([jsonString], { type: "application/json" });
        // Create an anchor element with a download attribute
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = `server-backup-${this.discordService.getLocalDiscordGuildId()}.json`;

        // Append the anchor element to the document, trigger the click event, and remove it
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    handleCheckedChanged(feature, checked) {
        if (!checked) {
            this.selectedFeatures.splice(this.selectedFeatures.indexOf(feature), 1);
        } else {
            this.selectedFeatures.push(feature);
        }
    }
}
