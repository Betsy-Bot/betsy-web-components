import {bindable} from "aurelia-framework";
import {DiscordComponentType, DiscordForm} from "../../../services/models/discord";

export class DiscordFormCreator {
    @bindable form: DiscordForm;

    addField() {
        this.form.formData.components.push({
            type: DiscordComponentType.ActionRow,
            components: [{
                custom_id: "",
                type: DiscordComponentType.TextInput,
                label: ""
            }]
        })
    }

    deleteField(index) {
        this.form.formData.components.splice(index, 1)
    }
}
