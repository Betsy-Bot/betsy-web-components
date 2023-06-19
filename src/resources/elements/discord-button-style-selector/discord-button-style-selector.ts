import { bindable, BindingMode } from "aurelia";

export class DiscordButtonStyleSelector {
    @bindable({ mode: BindingMode.twoWay }) style: string;

    styles = [
        {
            label: "Primary",
            value: 1,
        },
        {
            label: "Secondary",
            value: 2,
        },
        {
            label: "Success",
            value: 3,
        },
        {
            label: "Danger",
            value: 4,
        },
        {
            label: "Link",
            value: 5,
        },
    ];
}
