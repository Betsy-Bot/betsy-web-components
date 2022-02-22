import EditorJS from '@editorjs/editorjs';

export class EmbedEditor {
    editor: EditorJS;

    created() {
        this.editor = new EditorJS({
            holder: 'editorjs',
        })
    }
}