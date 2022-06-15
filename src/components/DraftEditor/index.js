import { useState } from 'react';

import { Editor, EditorState, convertToRaw } from 'draft-js';

import { post } from '../../utils/request';
import { COLOR } from '../../utils/style';
import { EditorWrapper, Header, HighLight, Name, NavigateBar, Icon } from './style';

import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import 'draft-js/dist/Draft.css';

function DraftEditor({ setShow, groupId }) {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    const submitCycle = () => {
        const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
        const value = blocks.map((block) => (!block.text.trim() && '\n') || block.text).join('\n');
        post(
            '/management/cycle-reports',
            {
                title: 'DRAFT',
                content: value,
                resourceLink: '',
            },
            {
                params: {
                    groupId: groupId,
                },
            }
        );
    };

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
                    <Icon bg={COLOR.green[0]} onClick={submitCycle}>
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
