import {bindable, inject} from "aurelia-framework";
import './feature-item-list.scss';

export class FeatureItemList {
    @bindable data: any;
    @bindable showToggler: boolean;
    @bindable namePrefix: string;
    @bindable toggleHandler;
    @bindable itemClickHandler;

    handleToggleClick(event, item) {
        item.active = !item.active;
        this.toggleHandler({item: item});
        event.stopPropagation();
    }

    handleItemClick(item) {
        this.itemClickHandler({item: item});
    }
}
