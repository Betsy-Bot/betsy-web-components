import {bindable, customElement, ICustomElementViewModel} from "aurelia";
import { DiscordEmbed, DiscordEmbedField } from "../../../services/models/discord";
import './embed-editor.scss';
import template from "./embed-editor.html";

@customElement({
    name: 'embed-editor',
    template: template,
    containerless: true
})
export class EmbedEditor implements ICustomElementViewModel{
    @bindable embed: DiscordEmbed = {};

    addField() {
        if (!this.embed.fields) {
            this.embed.fields = [];
        }
        this.embed.fields.push(new class implements DiscordEmbedField {
            inline: false;
            name: 'Some Name';
            value: 'Value';
        })
    }

    deleteField(index) {
        this.embed.fields.splice(index, 1);
    }
}
