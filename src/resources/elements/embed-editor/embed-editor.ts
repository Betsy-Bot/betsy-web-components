import { bindable, containerless, ICustomElementViewModel } from "aurelia";

import { DiscordEmbed, DiscordEmbedField } from "../../../services/models/discord";

import './embed-editor.scss';

@containerless()
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
