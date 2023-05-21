import { inject } from "aurelia";
import { IEventAggregator } from "aurelia";
import { IRouter,IRouteViewModel, route } from "@aurelia/router-lite";

import { DiscordService } from "../../../../../services/discord-service";
import {
    DiscordComponentType,
    DiscordForm,
} from "../../../../../services/models/discord";

import { toast } from "lets-toast";

@route({
    path: "forms/create",
    title: "Create Form",
})
@inject(IEventAggregator, DiscordService, IRouter)
export class CreateForm implements IRouteViewModel {
    constructor(
        private eventAggregator: IEventAggregator,
        private discordService: DiscordService,
        private router: IRouter
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

    async save() {
        try {
            if (this.didLoad) {
                return;
            }
            this.didLoad = true;
            await this.discordService.createDiscordForm(this.form);
            toast("Form Created!");
            await this.router.load( `../forms`, { context: this });
        } catch (e) {
            toast(e, { severity: "error" });
            throw e;
        } finally {
            this.didLoad = false;
        }
    }

    readonly loadingIndicator = '<moo-circular-progress size="50" stroke-width="3"></moo-circular-progress>';
}
