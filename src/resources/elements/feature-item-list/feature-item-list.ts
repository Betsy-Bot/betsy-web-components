import { bindable, inject } from "aurelia";
import { IRouter, Router } from "@aurelia/router-lite";

import { ChannelNameValueConverter } from "../../value-converters/channel-name";

import "./feature-item-list.scss";
import { DiscordService } from "../../../services/discord-service";

export enum ValueConverter {
    ChannelName = "ChannelName",
}
@inject(ChannelNameValueConverter, Router, DiscordService)
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
    guildId: string;

    constructor(
        private channelValueConverter: ChannelNameValueConverter,
        private router: IRouter,
        private discordService: DiscordService
    ) {}

    binding() {
        this.columns = [
            {
                dataField: this.nameOverride ?? "identifier",
            },
            {
                caption: "",
                cellTemplate: this.linkTemplate,
                alignment: "center",
            },
        ];
    }

    attached() {
        this.guildId = this.discordService.getLocalDiscordGuildId();
    }

    handleToggleClick(event, item) {
        item.active = !item.active;
        this.toggleHandler({ item: item });
        event.stopPropagation();
    }

    handleItemClick(item) {
        this.itemClickHandler({ item: item });
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
            context: this,
        });
    }

    linkTemplate = (container, options) => {
        const clone = this.linkEl.cloneNode(true) as HTMLSpanElement;
        clone.classList.remove("d-none");
        clone.onclick = () => this.routeToItem(options.data.id);
        container.append(clone);
    };
}
