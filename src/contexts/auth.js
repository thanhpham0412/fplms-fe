import { useState, createContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuth, setAuth] = useState(true);
    return <AuthContext.Provider value={{ isAuth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
