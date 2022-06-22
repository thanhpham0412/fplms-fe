import styled from 'styled-components';

import { COLOR } from '../../utils/style';

export const EditorWrapper = styled.div`
    min-width: 1100px;
    max-width: 1100px;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 6rem;
    min-height: 800px;
    max-height: 800px;
    display: flex;
    flex-flow: column;

    div.public-DraftStyleDefault-block {
        margin-bottom: 1rem;
    }

    div.DraftEditor-root {
        border-radius: 0 0 4px 4px;
        flex: 1 1 auto;
        max-height: 100%;
        overflow: auto;
        background: #fff;
        ::-webkit-scrollbar-track {
            background: #fff;
        }
        div.DraftEditor-editorContainer {
            height: 100%;
        }

        div.public-DraftEditor-content {
            height: 100%;
        }
    }

    [data-contents='true'] {
        padding: 2rem 4rem;
        box-sizing: border-box;
    }
`;

export const HighLight = styled.div`
    font-weight: 900;
    letter-spacing: 0.05rem;
    margin-bottom: 0.05rem;
`;

export const Name = styled.div`
    font-size: 12px;
    color: ${COLOR.gray[1]};
`;

export const Header = styled.div`
    border-radius: 4px 4px 0 0;
    background: ${COLOR.primary02};
    min-height: 60px;
    display: flex;
    padding: 1rem;
    box-sizing: border-box;
    border-bottom: 2px solid ${COLOR.gray[4]};
    align-items: center;
    justify-content: space-between;
`;

export const NavigateBar = styled.div`
    display: flex;
    gap: 0.5rem;
`;

export const Icon = styled.div`
    padding: 0.3rem;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({ bg }) => bg};
    cursor: pointer;

    svg {
        width: 1.5rem;
        height: 1.5rem;
        fill: #fff;
    }
`;
