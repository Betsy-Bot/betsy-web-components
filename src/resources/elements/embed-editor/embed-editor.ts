import { IValidationController } from '@aurelia/validation-html';
import { IValidationRules, IValidateable, BaseValidationRule } from '@aurelia/validation';
import { newInstanceForScope } from '@aurelia/kernel';
import {bindable} from "aurelia";
import { DiscordEmbed } from "../../../services/models/discord";

export class EmbedEditor {
    @bindable embed: DiscordEmbed = {};

    constructor(@newInstanceForScope(IValidationController) private validationController: IValidationController,
                @IValidationRules private rules: IValidationRules) {
        this.rules.on(this.embed)
            .ensure('url')
            .required()
            .satisfiesRule(new URLValidationRule()).withMessage("URL must be in the format 'http(s)://domain.com'")
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
