import {bindable} from "aurelia-framework";

export class DiscordComponentCreator {
    @bindable components;

    styles = [
        {
            label: 'Primary',
            value: 1,
        },
        {
            label: 'Secondary',
            value: 2,
        },
        {
            label: 'Success',
            value: 3,
        },
        {
            label: 'Danger',
            value: 4,
        }
    ]
}
