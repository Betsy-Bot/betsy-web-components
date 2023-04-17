import {
    bindable,
    customElement,
    ICustomElementViewModel,
    inject,
} from "aurelia";
import { IRouter } from "@aurelia/router-lite";
import "./feature-header.scss";
import template from "./feature-header.html";

@customElement({
    name: "feature-header",
    template: template,
    containerless: true,
})
@inject(IRouter)
export class FeatureHeader implements ICustomElementViewModel {
    constructor(private router: IRouter) {}

    @bindable title;
    @bindable subtitle;
    @bindable hideBack;
    @bindable docUrl;
    @bindable displayWarning;
    @bindable deleteFunction;
    @bindable copyFunction;
    @bindable createFunction;
    @bindable createRoute: string;
    bannerOpen: boolean;

    handleDelete() {
        this.deleteFunction();
    }

    handleCreate() {
        this.createFunction();
    }

    handleCopy() {
        this.copyFunction();
    }

    bound() {
        this.bannerOpen = !!this.displayWarning;
    }
}
