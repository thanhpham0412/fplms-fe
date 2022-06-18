import React from 'react';

import { Editor, EditorState } from 'draft-js';

const TextEditor = () => {
    const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());

    const editor = React.useRef(null);
    function focusEditor() {
        editor.current.focus();
    }

    return (
        <div
            style={{ border: '1px solid black', minHeight: '6em', cursor: 'text' }}
            onClick={focusEditor}
        >
            <Editor
                ref={editor}
                editorState={editorState}
                onChange={setEditorState}
                placeholder="Write something!"
            />
        </div>
    );
};

export default TextEditor;
