import { StyledButton } from './style.js';

const Button = ({ icon, children, size, onClick }) => {
    return (
        <StyledButton size={size} onClick={onClick}>
            {icon}
            <div>{children}</div>
        </StyledButton>
    );
};

export default Button;
