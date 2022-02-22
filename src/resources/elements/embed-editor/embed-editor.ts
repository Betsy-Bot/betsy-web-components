import EditorJS from '@editorjs/editorjs';
import {bindable} from "aurelia";

export class EmbedEditor {
    @bindable embed;
    editor: EditorJS;

    created() {
        this.editor = new EditorJS({
            holder: 'editorjs',
        })
    }
}