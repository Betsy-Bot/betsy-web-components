import { DiscordComponentType, DiscordForm } from "../../../../../services/models/discord";
import {Router} from 'aurelia-router';
import {inject} from "aurelia-framework";
import {EventAggregator} from "aurelia-event-aggregator";
import {DiscordService} from 'services/discord-service';
import {toast} from "lets-toast";

@inject(EventAggregator, DiscordService, Router)
export class CreateForm {
    constructor(private eventAggregator: EventAggregator, private discordService: DiscordService, private router: Router) {
    }
    params;
    guildId;
    loading = false;

    form: DiscordForm = {
        customId: "",
        title: "",
        description: "",
        submissions: [],
        formData: {
            components: [
                {
                    type: DiscordComponentType.ActionRow,
                    components: [{
                        custom_id: "",
                        type: DiscordComponentType.TextInput,
                        label: ""
                    }]
                }
            ]
        }
    };

    activate(params) {
        this.params = params;
        this.guildId = this.params.guildId;
    }

    async save() {
        try {
            if (this.loading) {
                return;
            }
            this.loading = true;
            await this.discordService.createDiscordForm(this.guildId, this.form);
            toast("Form Created!");
            this.router.navigate(`resources/forms`)
        } catch(e) {
            toast(e, {severity: 'error'})
            throw e;
        } finally {
            this.loading = false;
        }
    }

    get loadingIndicator() {
        return '<mdc-circular-progress size="50" stroke-width="3"></mdc-circular-progress>'
    }
}
