import { useState } from 'react';

import { Editor, EditorState } from 'draft-js';

import { COLOR } from '../../utils/style';
import { EditorWrapper, Header, HighLight, Name, NavigateBar, Icon } from './style';

import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import 'draft-js/dist/Draft.css';

function DraftEditor({ setShow }) {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    return (
        <EditorWrapper>
            <Header>
                <div>
                    <HighLight>REPORT #1</HighLight>
                    <Name>DRAFT</Name>
                </div>
                <NavigateBar>
                    <Icon bg={COLOR.blue[0]}>
                        <SaveIcon />
                    </Icon>
                    <Icon bg={COLOR.green[0]}>
                        <SendIcon />
                    </Icon>
                    <Icon bg={COLOR.red[0]} onClick={() => setShow(false)}>
                        <CloseIcon />
                    </Icon>
                </NavigateBar>
            </Header>
            <Editor editorState={editorState} onChange={setEditorState} />
        </EditorWrapper>
    );
}

export default DraftEditor;
