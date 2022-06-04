import { StyledContainer, ActiveMember, MemberInfo, Avatar, Comments } from './style';

const TopActivities = ({ arr }) => {
    return (
        <StyledContainer>
            Top Activities
            {arr.map((data) => (
                <ActiveMember key={data.name}>
                    <MemberInfo>
                        <Avatar />
                        <span>{data.name}</span>
                    </MemberInfo>
                    <Comments>{data.comments}</Comments>
                </ActiveMember>
            ))}
        </StyledContainer>
    );
};

export default TopActivities;
