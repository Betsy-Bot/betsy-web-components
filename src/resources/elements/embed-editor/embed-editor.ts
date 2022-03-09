import { IValidationController } from '@aurelia/validation-html';
import { IValidationRules, IValidateable, BaseValidationRule } from '@aurelia/validation';
import { newInstanceForScope } from '@aurelia/kernel';
import {bindable} from "aurelia";
import {DiscordEmbed, DiscordEmbedField} from "../../../services/models/discord";

export class EmbedEditor {
    @bindable embed: DiscordEmbed = {};

    constructor(@newInstanceForScope(IValidationController) private validationController: IValidationController,
                @IValidationRules private rules: IValidationRules) {
        this.rules.on(this.embed)
            .ensure('url')
            .required()
            .satisfiesRule(new URLValidationRule()).withMessage("URL must be in the format 'http(s)://domain.com'")
    }

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

class URLValidationRule extends BaseValidationRule {
    public execute(value: any, _object?: IValidateable): boolean {
        let url;

        try {
            url = new URL(value);
        } catch (_) {
            return false;
        }

        return url.protocol === "http:" || url.protocol === "https:";
    }
}
