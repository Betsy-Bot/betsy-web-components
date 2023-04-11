import {
    DiscordComponentType,
    DiscordForm,
} from "../../../../../services/models/discord";
import { inject } from "aurelia";
import { IEventAggregator } from "aurelia";
import { DiscordService } from "../../../../../services/discord-service";
import { toast } from "lets-toast";
import { IRouteViewModel, Router } from "@aurelia/router-lite";

@inject(IEventAggregator, DiscordService, Router)
export class CreateForm implements IRouteViewModel {
    constructor(
        private eventAggregator: IEventAggregator,
        private discordService: DiscordService,
        private router: Router
    ) {}
    params;
    guildId;
    didLoad = false;

    form: DiscordForm = {
        customId: "",
        title: "",
        description: "",
        submissions: [],
        formData: {
            components: [
                {
                    type: DiscordComponentType.ActionRow,
                    components: [
                        {
                            custom_id: "",
                            type: DiscordComponentType.TextInput,
                            label: "",
                        },
                    ],
                },
            ],
        },
    };

    loading(params) {
        this.params = params;
        this.guildId = this.params.guildId;
    }

    async save() {
        try {
            if (this.didLoad) {
                return;
            }
            this.didLoad = true;
            await this.discordService.createDiscordForm(
                this.guildId,
                this.form
            );
            toast("Form Created!");
            this.router.load(`resources/forms`);
        } catch (e) {
            toast(e, { severity: "error" });
            throw e;
        } finally {
            this.didLoad = false;
        }
    }

    get loadingIndicator() {
        return '<moo-circular-progress size="50" stroke-width="3"></moo-circular-progress>';
    }
}
