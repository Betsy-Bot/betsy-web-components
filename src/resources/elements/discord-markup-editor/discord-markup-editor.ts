import {
    bindable,
    BindingMode, containerless,
    ICustomElementViewModel,
} from 'aurelia';

import './discord-markup-editor.scss';

import { defineOptions, ink } from 'ink-mde';
@containerless()
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
            appearance: 'dark',
        },
        toolbar: {
            bold: true,
            code: false,
            codeBlock: false,
            heading: true,
            image: false,
            italic: true,
            link: true,
            list: true,
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
