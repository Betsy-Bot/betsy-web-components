import { bindable } from "aurelia-framework";

export class DiscordWelcomeMessageSettings {
    @bindable message;
    @bindable guildId;

    types = [
        {
            displayName: "Welcome Channel Message",
            value: 3
        },
        {
            displayName: "Welcome Direct Message",
            value: 4
        }
    ]
}
