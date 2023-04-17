import { defineOptions, ink } from "ink-mde";
import "./discord-markup-editor.scss";
import {
    bindable,
    BindingMode,
    customElement,
    ICustomElementViewModel,
} from "aurelia";
import template from "./discord-markup-editor.html";
@customElement({
    name: "discord-markup-editor",
    template: template,
    containerless: true,
})
export class DiscordMarkupEditor implements ICustomElementViewModel {
    @bindable({ mode: BindingMode.twoWay }) value: string;
    @bindable label: string;
    @bindable maxlength: number;
    editor;
    element: HTMLElement;
    options = defineOptions({
        interface: {
            attribution: false,
            toolbar: true,
            appearance: "dark",
        },
        toolbar: {
            bold: true,
            code: false,
            codeBlock: false,
            heading: false,
            image: false,
            italic: true,
            link: true,
            list: false,
            orderedList: false,
            quote: true,
            taskList: false,
            upload: false,
        },
        hooks: {
            afterUpdate: (doc: string) => {
                this.value = doc;
            },
        },
    });

    attached() {
        if (!this.editor) {
            this.options.placeholder = this.label;
            this.editor = ink(this.element, this.options);
        }
        if (this.editor) {
            this.editor.update(this.value);
        }
    }
}
