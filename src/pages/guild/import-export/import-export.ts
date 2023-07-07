import { inject, observable } from "aurelia";
import { route } from "@aurelia/router-lite";

import { DiscordService } from "../../../services/discord-service";

import { toast } from "lets-toast";

@route({
    path: "import-export",
    title: "Import / Export",
})
@inject(DiscordService)
export class ImportExport {
    features = ["MessageTemplates", "Forms", "Commands"];
    selectedFeatures = [];
    isExporting = false;
    isImporting = false;
    @observable uploadFile: File;
    uploadElement: HTMLInputElement;

    constructor(private discordService: DiscordService) {
        this.selectedFeatures = [...this.features];
    }

    attached() {
        this.uploadElement.addEventListener("change", (event) => {
            //@ts-expect-error
            const file = event.target.files[0];

            if (file) {
                this.isImporting = true;
                const reader = new FileReader();

                reader.addEventListener("load", async (event) => {
                    const uploadedJSON = event.target.result;

                    // Parse the JSON string into a JavaScript object
                    //@ts-expect-error;
                    const jsonObject = JSON.parse(uploadedJSON);
                    const count = await this.discordService.importTemplate(
                        jsonObject
                    );
                    toast(`Imported settings. ${count} Settings Imported`);
                });

                reader.readAsText(file);
            }
        });
    }

    async handleExport() {
        this.isExporting = true;
        const response = await this.discordService.exportTemplate(
            this.selectedFeatures
        );
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
        this.isExporting = false;
    }

    handleCheckedChanged(feature, checked) {
        if (!checked) {
            this.selectedFeatures.splice(
                this.selectedFeatures.indexOf(feature),
                1
            );
        } else {
            this.selectedFeatures.push(feature);
        }
    }

    handleImport() {
        this.isImporting = true;
    }
}
