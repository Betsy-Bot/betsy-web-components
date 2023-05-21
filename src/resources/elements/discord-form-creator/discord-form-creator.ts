import { bindable } from "aurelia";

import {
    DiscordComponentType,
    DiscordForm,
    DiscordTextInputType,
} from "../../../services/models/discord";

export class DiscordFormCreator {
    @bindable form: DiscordForm;
    fieldTypes = [
        {
            label: "Text Input",
            value: DiscordComponentType.TextInput,
        },
    ];

    textInputType = [
        {
            label: "Short Input",
            value: DiscordTextInputType.Short,
        },
        {
            label: "Paragraph",
            value: DiscordTextInputType.Paragraph,
        },
    ];

    addField() {
        this.form.formData.components.push({
            type: DiscordComponentType.ActionRow,
            components: [
                {
                    custom_id: "",
                    type: DiscordComponentType.TextInput,
                    label: "",
                },
            ],
        });
    }

    deleteField(index) {
        this.form.formData.components.splice(index, 1);
    }
}
