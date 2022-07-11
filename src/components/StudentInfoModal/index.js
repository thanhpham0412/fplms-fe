/* eslint-disable no-unused-vars */
import Overlay from '../Overlay';
import { Avatar, Content, Wrapper, Left, Right, Label, Infomation } from './style';

const StudentInfoModal = ({ isOpen, studentInfo, setOpen }) => {
    return (
        <Overlay isOpen={isOpen} closeFn={setOpen}>
            <Wrapper>
                <Avatar>
                    <img src={studentInfo?.picture} />
                </Avatar>
                <Content>
                    <Left></Left>
                    <Right>
                        <Label fS={'30px'} bold={true}>
                            Student Infomation
                        </Label>
                        <Infomation>{studentInfo?.name}</Infomation>
                        <Infomation>{studentInfo?.email}</Infomation>
                        <Infomation>Points: 0</Infomation>
                    </Right>
                </Content>
            </Wrapper>
        </Overlay>
    );
};

export default StudentInfoModal;
