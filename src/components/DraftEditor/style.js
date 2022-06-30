import styled from 'styled-components';

export const EditorWrapper = styled.div`
    max-width: 100%;
    height: 100%;
    box-sizing: border-box;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    div.public-DraftStyleDefault-block {
        margin-bottom: 1rem;
    }

    div.DraftEditor-root {
        flex: 1 1 auto;
        display: flex;
        overflow: auto;
        background: #fff;
        ::-webkit-scrollbar-track {
            background: #fff;
        }
        div.DraftEditor-editorContainer {
            flex: 1 1 auto;
            overflow: auto;
        }
        div.public-DraftEditor-content {
            height: 100%;
        }
    }

    .public-DraftEditorPlaceholder-root {
        color: #999;
        position: absolute;
    }

    [data-contents='true'] {
        padding: ${({ padding }) => padding || '6rem 12rem'};
        box-sizing: border-box;
    }
`;
