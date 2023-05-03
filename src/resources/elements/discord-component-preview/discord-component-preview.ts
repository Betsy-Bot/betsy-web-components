import { bindable, containerless, ICustomElementViewModel } from "aurelia";

import { DiscordComponentType } from "../../../services/models/discord";


@containerless()
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
