import { bindable, inject } from "aurelia";
import { IRouteContext,IRouter } from "@aurelia/router-lite";

import { DiscordService } from "../../../services/discord-service";
import { ChannelNameValueConverter } from "../../value-converters/channel-name";

import "./feature-item-list.scss";

export enum ValueConverter {
    ChannelName = "ChannelName",
}

@inject(ChannelNameValueConverter, IRouter, DiscordService, IRouteContext)
export class FeatureItemList {
    @bindable data: any[];
    @bindable showToggler: boolean;
    @bindable namePrefix: string;
    @bindable toggleHandler;
    @bindable itemClickHandler;
    @bindable nameOverride;
    @bindable nameSuffix;
    @bindable suffixProperty;
    @bindable trailingIcon;
    @bindable valueConverter: ValueConverter = null;
    @bindable route;
    columns = [];
    linkEl: HTMLAnchorElement;
    switchEl: HTMLSpanElement;
    guildId: string;

    constructor(
        private channelValueConverter: ChannelNameValueConverter,
        private router: IRouter,
        private discordService: DiscordService,
        private context: IRouteContext
    ) {
    }

    binding() {
        this.columns = [
            {
                dataField: this.nameOverride ?? "identifier",
            },
            {
                caption: "",
                cellTemplate: this.linkTemplate,
                alignment: "center",
                width: 200
            },
            {
                caption: "Active",
                cellTemplate: this.toggleTemplate,
                alignment: "center",
                width: 200
            },
        ];
    }

    attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
    }

    handleToggleClick(item, switchComponent: HTMLElement) {
        item.active = !item.active;
        switchComponent.innerText = item.active ? "Deactivate" : "Activate";
        this.toggleHandler(item);
    }

    handleItemClick(item) {
        this.itemClickHandler(item);
    }

    getName(item) {
        if (this.nameOverride) {
            return this.convertValue(item[this.nameOverride]);
        }
        return this.convertValue(item.name ? item.name : item.title);
    }

    convertValue(value) {
        switch (this.valueConverter) {
        case ValueConverter.ChannelName:
            return this.channelValueConverter.toView(value);
        default:
            return value;
        }
    }

    nameTemplate = (container, options) => {
        const el = document.createElement("span");
        el.innerHTML = this.getName(options.data);
        container.append(el);
    };

    async routeToItem(id: string) {
        console.log(`load route`, `${this.route}/${id}`);
        await this.router.load(`${this.route}/${id}`, {
            context: this.context,
        });
    }

    linkTemplate = (container, options) => {
        const clone = this.linkEl.cloneNode(true) as HTMLAnchorElement;
        clone.classList.remove("d-none");
        clone.onclick = () => this.routeToItem(options.data.id);
        container.append(clone);
    };

    toggleTemplate = (container, options) => {
        const switchComponent = this.switchEl.querySelector('button').cloneNode(true) ;
        switchComponent.innerText = options.data.active ? "Deactivate" : "Activate";
        switchComponent.onclick = () => this.handleToggleClick(options.data, switchComponent);
        container.append(switchComponent);
    };
}
