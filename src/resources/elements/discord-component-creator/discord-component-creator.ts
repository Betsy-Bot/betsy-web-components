import { bindable, BindingMode } from "aurelia";

import { DiscordButtonStyle, DiscordComponentType } from "../../../services/models/discord";
import { moveDownInArray, moveUpInArray } from "../../array-utils";

export class DiscordComponentCreator {
    @bindable({ mode: BindingMode.twoWay }) components = [];
    @bindable maxComponents = 5;

    componentTypes = [
        {
            label: "Menu",
            type: DiscordComponentType.MenuSelect,
        },
        {
            label: "Button",
            type: DiscordComponentType.Button,
        },
    ];

    attached() {
        if (!this.components) {
            this.components = [];
        }
    }

    addNewComponentRow() {
        this.components.push({
            type: DiscordComponentType.ActionRow,
            components: [
                {
                    type: DiscordComponentType.Button,
                    style: DiscordButtonStyle.Success,
                    custom_id: "",
                    label: "Text",
                },
            ],
        });
    }

    addNewComponent(index: number) {
        this.components[index].components.push({
            type: DiscordComponentType.Button,
            style: DiscordButtonStyle.Success,
            custom_id: "",
            label: "Text",
        });
    }

    addMenuOption(index: number) {
        if (!this.components[index].components[0]) {
            this.components[index].components[0] = [];
        }
        if (!this.components[index].components[0].options) {
            this.components[index].components[0].options = [];
        }
        this.components[index].components[0].options.push({
            description: "",
            name: "",
            custom_id: "",
            label: "",
        });
    }

    removeMenuOption(index: number) {
        this.components[0].components[0].options.splice(index, 1);
    }

    removeComponentRow(rowIndex: number) {
        this.components.splice(rowIndex, 1);
    }

    handleMove(type: string, componentIndex: number, index: number) {
        switch (type) {
            case "up":
                moveUpInArray(this.components[componentIndex].components[0].options, index);
                break;
            case "down":
                moveDownInArray(this.components[componentIndex].components[0].options, index);
                break;
        }
    }

    removeComponent(rowIndex: number, componentIndex: number) {
        this.components[rowIndex].components.splice(componentIndex, 1);
        if (this.components[rowIndex].components.length == 0) {
            this.components.splice(rowIndex, 1);
        }
    }
}
