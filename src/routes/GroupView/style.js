import styled from 'styled-components';

import { COLOR } from '../../utils/style';

export const Container = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 360px;
    gap: 24px;

    * {
        font-family: Lato;
    }
`;

export const StyledList = styled.div`
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: fit-content;
`;

export const StyledItem = styled.div`
    box-sizing: border-box;
    font-size: 16px;
    padding: 1rem;
    background: ${({ feedback }) => (feedback ? COLOR.green[5] : COLOR.blue[5])};
`;

export const Title = styled.div`
    color: ${COLOR.green[0]};
    font-weight: bold;
    color: ${({ feedback }) => (feedback ? COLOR.green[0] : COLOR.blue[0])};
`;

export const Content = styled.div`
    margin-top: 1rem;
`;

export const SideBar = styled.div`
    position: sticky;
    top: 104px;
    height: fit-content;
`;

export const CommingContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const Icon = styled.div`
    width: fit-content;
    height: fit-content;

    svg {
        padding: 1rem;
        background: ${COLOR.blue[5]};
        fill: ${COLOR.blue[0]};
        border-radius: 4px;
        display: block;
    }
`;

export const CommingSection = styled.div`
    display: flex;
    gap: 1rem;
    height: fit-content;
`;

export const RightSide = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
`;

export const CommingTitle = styled.div`
    font-weight: bold;
    font-size: 1rem;
`;

export const Status = styled.div`
    font-size: 0.75rem;
    color: ${({ status }) => {
        switch (status) {
            case 'done':
                return COLOR.green[0];
            case 'missed':
                return COLOR.red[0];
        }
    }};
`;

export const StyledH4 = styled.h4`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const Round = styled.span`
    border-radius: 50%;
    background: ${COLOR.blue[0]};
    color: ${COLOR.primary02};
    width: 1.5rem;
    height: 1.5rem;
    font-size: 0.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Select = styled.div`
    margin-bottom: 1rem;
    max-width: 200px;
`;

export const PickContainer = styled.div`
    width: 100%;
    height: 100%;
    background: green;
`;
