import { useRef, useState } from 'react';

import axios from 'axios';
import { convertToHTML } from 'draft-convert';
import { convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { useNavigate } from 'react-router-dom';

import { error } from '../../utils/toaster';
import Selection from '../Selection';
import { Container, SubTitle, Wrapper, TitleBlock, Title, CreateBtn } from './style';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const TextEditor = () => {
    const [editorState, setEditorState] = useState({
        editorState: EditorState.createEmpty(),
    });

    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [subjectName, setSubject] = useState();
    const navigate = useNavigate();
    const editor = useRef(null);
    const options = [
        {
            content: 'SWP391',
            value: 'SWP391',
        },
        {
            content: 'OSG202',
            value: 'OSG202',
        },
        {
            content: 'SWT301',
            value: 'SWT301',
        },
    ];
    const URL = process.env.REACT_APP_DISCUSSION_URL + `/discussion/questions`;
    // const user = getTokenInfo();
    const header = {
        Authorization: `${localStorage.getItem('token')}`,
    };

    const onEditorStateChange = (editorState) => {
        setEditorState({
            editorState,
        });
        const contentState = editorState.getCurrentContent();
        console.log('content state', convertToHTML(contentState));
        setContent(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    };

    const handleAddQuestion = () => {
        axios
            .post(
                URL,
                {
                    title: title,
                    content: content,
                    subjectName: subjectName.value,
                },
                { headers: header }
            )
            .then(() => {
                navigate('/discussion-list');
            })
            .catch((err) => error(err));
    };

    return (
        <Container>
            <div>
                <Title sz={'28px'} mg={`0 0 20px 20px`}>
                    Adding new question
                </Title>
                <Wrapper>
                    <Title>Title</Title>
                    <SubTitle>Main idea of the question which it describes for</SubTitle>
                    <TitleBlock
                        placeholder="A title will briefly describe the issue"
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <Title>Subject</Title>
                    <div style={{ width: 'fit-content' }}>
                        <Selection
                            options={options}
                            placeholder={`Subject`}
                            onChange={setSubject}
                        />
                    </div>
                    <Title>Body</Title>
                    <SubTitle>Describe the issue</SubTitle>
                    <div className="editor">
                        <Editor
                            editorState={editorState.editorState}
                            toolbar={{
                                inline: { inDropdown: true },
                                list: { inDropdown: true },
                                textAlign: { inDropdown: true },
                                link: { inDropdown: true },
                                history: { inDropdown: true },
                            }}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={onEditorStateChange}
                            ref={editor}
                            onClick={focus}
                        />
                    </div>
                </Wrapper>
                <CreateBtn onClick={handleAddQuestion}>CREATE QUESTION</CreateBtn>
            </div>
        </Container>
    );
};

export default TextEditor;
