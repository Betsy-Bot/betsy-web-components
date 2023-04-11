import {bindable, customElement, ICustomElementViewModel} from "aurelia";
import { DiscordComponentType } from "../../../services/models/discord";
import template from "./discord-component-preview.html";

@customElement({
    name: 'discord-component-preview',
    template: template,
    containerless: true
})
export class DiscordComponentPreview implements ICustomElementViewModel{
    @bindable components;

    getColumnClass(length, type) {
        if (length == 1) {
            return 'col-12';
        }
        switch (type) {
            case DiscordComponentType.Button:
                return 'col-2'
            case DiscordComponentType.MenuSelect:
                return 'col-12'
        }
    }
}
