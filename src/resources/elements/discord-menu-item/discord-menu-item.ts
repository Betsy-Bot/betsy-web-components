import { bindable } from 'aurelia';

export class DiscordMenuItem {
    @bindable item;
    @bindable index: number;
    @bindable removeFunction: () => void;
    @bindable moveFunction: (string) => void;
    @bindable optionsSize: number;

    removeItem() {
        this.removeFunction();
    }

    handleMove(type: string) {
        this.moveFunction(type);
    }

    get showUp() {
        return this.index > 0;
    }

    get showDown() {
        return this.index + 1 < this.optionsSize;
    }
}
