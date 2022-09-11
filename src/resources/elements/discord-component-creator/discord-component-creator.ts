import {bindable} from "aurelia-framework";
import {DiscordButtonStyle, DiscordComponentType} from "services/models/discord";

export class DiscordComponentCreator {
    @bindable components = [];
    @bindable maxComponents = 1;
    @bindable customBuilder = false;

    attached() {
        if (!this.components) {
            this.components = [];
        }
    }

    addNewComponent() {
        this.components.push({
            type: DiscordComponentType.ActionRow,
            components: [{
                type: DiscordComponentType.Button,
                style: DiscordButtonStyle.Success,
                custom_id: "",
                label: "Text"
            }]
        })
    }

    styles = [
        {
            label: 'Primary',
            value: 1,
        },
        {
            label: 'Secondary',
            value: 2,
        },
        {
            label: 'Success',
            value: 3,
        },
        {
            label: 'Danger',
            value: 4,
        },
        {
            label: 'Link',
            value: 5,
        }
    ]
}
