import { bindable } from "aurelia";
import { DiscordButtonStyle, DiscordComponentType } from "../../../services/models/discord";

export class DiscordComponentCreator {
    @bindable components = [];
    @bindable maxComponents = 1;

    componentTypes = [
        {
            label: "Menu",
            type: DiscordComponentType.MenuSelect
        },
        {
            label: "Button",
            type: DiscordComponentType.Button
        }
    ]
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

    attached() {
        if (!this.components) {
            this.components = [];
        }
    }

    addNewComponentRow() {
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

    addNewComponent(index) {
        this.components[index].components.push({
            type: DiscordComponentType.Button,
            style: DiscordButtonStyle.Success,
            custom_id: "",
            label: "Text"
        })
    }

    addMenuOption(index) {
        if (!this.components[index].components[0]) {
            this.components[index].components[0] = [];
        }
        if (!this.components[index].components[0].options) {
            this.components[index].components[0].options = [];
        }
        this.components[index].components[0].options.push({
            description: '',
            name: '',
            custom_id: '',
            label: '',
        });
    }

    removeMenuOption(index) {
        this.components[0].components[0].options.splice(index, 1);
    }

    removeComponentRow(rowIndex) {
        this.components.splice(rowIndex, 1);
    }

    removeComponent(rowIndex, componentIndex) {
        this.components[rowIndex].components.splice(componentIndex, 1);
    }
}
