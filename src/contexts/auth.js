import { useState, createContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuth, setAuth] = useState(localStorage.getItem('token') || false);
    // if (localStorage.getItem('token')) {
    //     setAuth(true);
    // }
    return <AuthContext.Provider value={{ isAuth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
