import {bindable, autoinject} from "aurelia-framework";
import './feature-item-list.scss';
import { ChannelNameValueConverter } from "../../value-converters/channel-name";

export enum ValueConverter { ChannelName = "ChannelName" }
@autoinject
export class FeatureItemList {
    @bindable data: any;
    @bindable showToggler: boolean;
    @bindable namePrefix: string;
    @bindable toggleHandler;
    @bindable itemClickHandler;
    @bindable nameOverride;
    @bindable nameSuffix;
    @bindable suffixProperty;
    @bindable trailingIcon
    @bindable valueConverter: ValueConverter = null

    constructor(private channelValueConverter: ChannelNameValueConverter) {
    }


    handleToggleClick(event, item) {
        item.active = !item.active;
        this.toggleHandler({item: item});
        event.stopPropagation();
    }

    handleItemClick(item) {
        this.itemClickHandler({item: item});
    }

    getName(item) {
        if (this.nameOverride) {
            return this.convertValue(item[this.nameOverride]);
        }
        let value = this.convertValue(item.name ? item.name : item.title);
    }

    convertValue(value) {
        switch (this.valueConverter) {
            case ValueConverter.ChannelName:
                return this.channelValueConverter.toView(value);
            default:
                return value;
        }
    }
}
