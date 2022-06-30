/* eslint-disable no-unused-vars */
import { useState, useRef } from 'react';

import { Editor, EditorState, convertToRaw, ContentState } from 'draft-js';

import { COLOR } from '../../utils/style';
import { EditorWrapper } from './style';

import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import 'draft-js/dist/Draft.css';

function DraftEditor({ editorRef, submit, initValue, readonly }) {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createWithContent(ContentState.createFromText(initValue || ''))
    );

    const submitter = () => {
        const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
        const value = blocks.map((block) => (!block.text.trim() && '\n') || block.text).join('\n');
        submit(value);
    };

    return (
        <Editor
            ref={editorRef}
            editorState={editorState}
            onChange={setEditorState}
            readOnly={readonly}
        />
    );
}

export default DraftEditor;
