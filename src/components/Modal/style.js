import styled from 'styled-components';

const ModalOverlay = styled.div`
    width: 100%;
    height: 100vh;
    align-items: center;
    justify-content: center;
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: ${(props) => {
        if (props.isDisplayed === false) {
            return 'none';
        } else {
            return 'flex';
        }
    }};
`;

const ModalContainer = styled.div`
    width: 300px;
    display: flex;
    flex-direction: column;
    background-color: #fff;
`;
const ModalHeader = styled.div`
    width: 100%;
    border-bottom: 1px solid #e8e8e8;
    padding: 12px;
    display: flex;
    justify-content: space-between;

    svg {
        :hover {
            cursor: pointer;
        }
        background-color: #f44887;
        border-radius: 4px;
        color: #fff;
    }
`;

const ModalTitle = styled.div`
    display: flex;
    flex-direction: column;
`;

const ModalName = styled.div`
    font-size: 1rem;
    text-transform: uppercase;
`;

const CourseName = styled.div`
    font-size: 0.8rem;
    color: #8b8b8b;
`;

const ModalContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 12px;
    gap: 1rem;
`;
const ModalInputLabel = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: #434343;
`;
const ModalInputSpace = styled.div`
    width: 100%;
    height: ${(props) => `${props.hg}px` || 'auto'};
    background: #eef2ff;
    border-radius: 4px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    font-size: 1rem;

    svg {
        :hover {
            cursor: pointer;
        }
    }
`;
const ModalRow = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(${(props) => props.inputNum}, 1fr);
    column-gap: 8px;
`;

const ModalColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
`;

const ModalSelect = styled.select`
    font-size: 1rem;
    width: 100%;
    height: ${(props) => `${props.hg}px` || 'auto'};
    background: #eef2ff;
    border-radius: 4px;
    border: none;
    align-items: center;
    padding: 12px;
    position: relative;

    overflow: hidden;
    ::after {
        padding: 0 1em;
        background: #2b2e2e;
        cursor: pointer;
        pointer-events: none;
        transition: 0.25s all ease;
    }
`;

const ModalBtn = styled.button`
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #5680f9;
    border-radius: 4px;
    text-transform: uppercase;
    color: #fff;
    font-size: 1rem;
    border: none;
    :hover {
        cursor: pointer;
    }
`;

export {
    ModalBtn,
    ModalContainer,
    ModalContent,
    ModalHeader,
    ModalInputSpace,
    ModalInputLabel,
    ModalRow,
    ModalColumn,
    ModalSelect,
    ModalName,
    ModalTitle,
    CourseName,
    ModalOverlay,
};
