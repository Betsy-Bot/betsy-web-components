import { defineOptions, ink } from 'ink-mde'
import './discord-markup-editor.scss';
import { bindable } from "aurelia-framework";

export class DiscordMarkupEditor {
    @bindable value: string;
    @bindable label: string;
    editor;
    element: HTMLElement;
    options = defineOptions({
        interface: {
            attribution: false,
            toolbar: true,
            appearance: 'dark',
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
        }
    })

    attached() {
        if (!this.editor) {
            this.options.placeholder = this.label;
            this.editor = ink(this.element, this.options);
            this.editor.update(this.value);
        }
    }
}
