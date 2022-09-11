import {bindable} from "aurelia-framework";
import {DiscordButtonStyle, DiscordComponentType} from "services/models/discord";

export class DiscordComponentCreator {
    @bindable components = [];
    @bindable maxComponents = 1;
    @bindable customBuilder = false;
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
        }
    ]

    attached() {
        if (!this.components) {
            this.components = [];
        }
        if (this.customBuilder) {
            this.styles.push({
                label: 'Link',
                value: 5,
            })
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
}
