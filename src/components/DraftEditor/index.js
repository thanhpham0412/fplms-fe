/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';

import {
    Editor,
    EditorState,
    convertToRaw,
    ContentState,
    RichUtils,
    convertFromRaw,
    getVisibleSelectionRect,
} from 'draft-js';

import { useMousePosition } from '../../hooks';
import { ToolBar } from './style';

import BackupIcon from '@mui/icons-material/Backup';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import 'draft-js/dist/Draft.css';

const save = (id, blocks) => {
    const draft = localStorage.getItem('draft');
    localStorage.setItem(
        'draft',
        JSON.stringify({
            ...draft,
            [id]: blocks,
        })
    );
};

const DraftEditor = ({ editorRef, initBlocks, readonly, placeholder, id }) => {
    const mousePos = useMousePosition();

    const [toolBar, setToolBar] = useState({
        top: 0,
        left: 0,
        isOpen: false,
    });

    const [editorState, setEditorState] = useState(() => {
        const draft = JSON.parse(localStorage.getItem('draft'));
        if ((draft && draft[id]) || initBlocks) {
            return EditorState.createWithContent(convertFromRaw(draft[id]));
        } else {
            return EditorState.createEmpty();
        }
    });

    useEffect(() => {
        // if (localStorage.getItem('draft')) {
        //     setEditorState(
        //         EditorState.createWithContent(
        //             convertFromRaw(JSON.parse(localStorage.getItem('draft')))
        //         )
        //     );
        // }
    }, []);

    const submitter = () => {
        const blocks = convertToRaw(editorState.getCurrentContent());
        if (id) {
            save(id, blocks);
        }
    };

    const onChange = (editorState) => {
        const selectionState = editorState.getSelection();
        const anchorKey = selectionState.getAnchorKey();
        const start = selectionState.getStartOffset();
        const end = selectionState.getEndOffset();
        if (anchorKey && start != end) {
            setToolBar({
                ...toolBar,
                top: mousePos.y - 28,
                left: mousePos.x,
                isOpen: true,
            });
        } else {
            setToolBar({
                ...toolBar,
                isOpen: false,
            });
        }
        setEditorState(editorState);
    };

    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    };

    const utils = {
        bold: () => {
            console.log(editorState);
            const nextState = RichUtils.toggleInlineStyle(editorState, 'BOLD');
            setEditorState(nextState);
        },
    };

    return (
        <>
            <ToolBar top={toolBar.top} left={toolBar.left} isOpen={toolBar.isOpen || false}>
                <button onMouseDown={(e) => e.preventDefault()} onClick={utils.bold}>
                    <FormatBoldIcon />
                </button>
                <button onMouseDown={(e) => e.preventDefault()} onClick={submitter}>
                    <BackupIcon />
                </button>
            </ToolBar>
            <Editor
                ref={editorRef}
                editorState={editorState}
                onChange={onChange}
                handleKeyCommand={handleKeyCommand}
                placeholder={placeholder}
            />
        </>
    );
};

export default DraftEditor;
