/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react';

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

import { faBold, faItalic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

function mouseDistanceFromElement(mouseEvent, element) {
    let $n = element,
        mX = mouseEvent.pageX,
        mY = mouseEvent.pageY,
        from = { x: mX, y: mY },
        off = $n.getBoundingClientRect(),
        ny1 = off.top + document.body.scrollTop,
        ny2 = ny1 + $n.offsetHeight,
        nx1 = off.left + document.body.scrollLeft,
        nx2 = nx1 + $n.offsetWidth,
        maxX1 = Math.max(mX, nx1),
        minX2 = Math.min(mX, nx2),
        maxY1 = Math.max(mY, ny1),
        minY2 = Math.min(mY, ny2),
        intersectX = minX2 >= maxX1,
        intersectY = minY2 >= maxY1,
        to = {
            x: intersectX ? mX : nx2 < mX ? nx2 : nx1,
            y: intersectY ? mY : ny2 < mY ? ny2 : ny1,
        },
        distX = to.x - from.x,
        distY = to.y - from.y,
        hypot = (distX ** 2 + distY ** 2) ** (1 / 2);
    return Math.floor(hypot);
}

const DraftEditor = ({ editorRef, initBlocks, readonly, placeholder, id }) => {
    const toolBarRef = useRef();
    const [toolBar, setToolBar] = useState({
        top: 0,
        left: 0,
        isOpen: false,
    });

    // const mousePos = useMousePosition((ev) => {
    //     const dist = mouseDistanceFromElement(ev, toolBarRef.current);
    //     if (dist > 50) {
    //         setToolBar({
    //             ...toolBar,
    //             isOpen: false,
    //         });
    //     }
    // });

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
        // const selectionState = editorState.getSelection();
        // const anchorKey = selectionState.getAnchorKey();
        // const start = selectionState.getStartOffset();
        // const end = selectionState.getEndOffset();
        // if (anchorKey && start != end) {
        //     setToolBar({
        //         ...toolBar,
        //         top: mousePos.y - 28,
        //         left: mousePos.x,
        //         isOpen: true,
        //     });
        // } else {
        //     setToolBar({
        //         ...toolBar,
        //         isOpen: false,
        //     });
        // }
        setEditorState(editorState);
    };

    // const handleKeyCommand = (command, editorState) => {
    //     const newState = RichUtils.handleKeyCommand(editorState, command);
    //     if (newState) {
    //         onChange(newState);
    //         return 'handled';
    //     }
    //     return 'not-handled';
    // };

    // const utils = {
    //     bold: () => {
    //         const nextState = RichUtils.toggleInlineStyle(editorState, 'BOLD');
    //         setEditorState(nextState);
    //     },
    //     italic: () => {
    //         const nextState = RichUtils.toggleInlineStyle(editorState, 'ITALIC');
    //         setEditorState(nextState);
    //     },
    // };

    return (
        <>
            {/* <ToolBar
                ref={toolBarRef}
                top={toolBar.top}
                left={toolBar.left}
                isOpen={toolBar.isOpen || false}
            >
                <button onMouseDown={(e) => e.preventDefault()} onClick={utils.bold}>
                    <FontAwesomeIcon icon={faBold} />
                </button>
                <button onMouseDown={(e) => e.preventDefault()} onClick={utils.italic}>
                    <FontAwesomeIcon icon={faItalic} />
                </button>
                <button onMouseDown={(e) => e.preventDefault()} onClick={submitter}>
                    <BackupIcon />
                </button>
            </ToolBar> */}
            <Editor
                ref={editorRef}
                editorState={editorState}
                onChange={onChange}
                placeholder={placeholder}
                onBlur={() => {
                    setToolBar({
                        ...toolBar,
                        isOpen: false,
                    });
                }}
            />
        </>
    );
};

export default DraftEditor;
