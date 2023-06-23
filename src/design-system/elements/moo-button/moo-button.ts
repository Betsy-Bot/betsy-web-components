import { bindable, containerless, ICustomElementViewModel } from "aurelia";

import "./moo-button.scss";

export type MOO_BUTTON_VARIANT = "primary" | "secondary";

@containerless()
export class MooButton implements ICustomElementViewModel {
    button: HTMLButtonElement;
    @bindable label: string;
    @bindable type: string;
    @bindable icon: string;
    @bindable variant: MOO_BUTTON_VARIANT = "primary";
    @bindable class = "";
    @bindable click = undefined;
    @bindable dataMdcDialogAction;
    @bindable disabled = false;

    get colorClass() {
        switch (this.variant) {
            case "primary":
                return "";
            case "secondary":
                return "moo-button-secondary";
        }
    }

    handleClick() {
        if (this.click) {
            this.click();
        }
    }

    get hasClickFunction() {
        return typeof this.click === "function";
    }
}
