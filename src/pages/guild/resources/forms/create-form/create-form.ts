import {DiscordForm} from "../../../../../services/models/discord";

export class CreateForm {
    form: DiscordForm = {
        custom_id: "",
        title: "",
        description: "",
        submissions: [],
        formData: {
            components: []
        }
    };
}
