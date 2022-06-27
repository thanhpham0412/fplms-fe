import { useState } from 'react';

import { Editor, EditorState, convertToRaw, ContentState } from 'draft-js';

import { COLOR } from '../../utils/style';
import { EditorWrapper, Header, HighLight, Name, NavigateBar, Icon } from './style';

import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import 'draft-js/dist/Draft.css';

function DraftEditor({ setShow, type, submit, initValue, readonly }) {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createWithContent(ContentState.createFromText(initValue))
    );

    const submitter = () => {
        const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
        const value = blocks.map((block) => (!block.text.trim() && '\n') || block.text).join('\n');
        submit(value);
    };

    return (
        <EditorWrapper>
            <Header>
                <div>
                    <HighLight>{type?.content.toUpperCase() || 'TEXT EDITOR'}</HighLight>
                    <Name>DRAFT</Name>
                </div>
                <NavigateBar>
                    <Icon bg={COLOR.blue[0]}>
                        <SaveIcon />
                    </Icon>
                    <Icon bg={COLOR.green[0]} onClick={submitter}>
                        <SendIcon />
                    </Icon>
                    <Icon bg={COLOR.red[0]} onClick={() => setShow(false)}>
                        <CloseIcon />
                    </Icon>
                </NavigateBar>
            </Header>
            <Editor editorState={editorState} onChange={setEditorState} readOnly={readonly} />
        </EditorWrapper>
    );
}

export default DraftEditor;
