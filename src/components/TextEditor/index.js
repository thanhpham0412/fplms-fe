import { useState } from 'react';

import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import { Container, SubTitle, Wrapper, TitleBlock, Title } from './style';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const TextEditor = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [content, setContent] = useState('');

    const onEditorStateChange = (textState) => {
        setEditorState({
            textState,
        });
        setContent(textState.getCurrentContent().getPlainText('\u000A'));
    };
    const { textState } = editorState;
    console.log(content);

    return (
        <Container>
            <div>
                <Title sz={'28px'} mg={`0 0 20px 20px`}>
                    Adding new post
                </Title>
                <Wrapper>
                    <Title>Title</Title>
                    <SubTitle>Main idea of the question which it describes for</SubTitle>
                    <TitleBlock placeholder="Lorem ipsum" />
                    <Title>Body</Title>
                    <SubTitle>Describe the issue</SubTitle>
                    <div className="editor">
                        <Editor
                            editorState={textState}
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
                        />
                    </div>
                </Wrapper>
            </div>
        </Container>
    );
};

export default TextEditor;
