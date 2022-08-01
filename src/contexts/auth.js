import { useState, createContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuth, setAuth] = useState(localStorage.getItem('token') || false);
    const [token, setToken] = useState(localStorage.getItem('token') || false);
    const [admin, setAdmin] = useState(localStorage.getItem('isAdmin') || false);
    // if (localStorage.getItem('token')) {
    //     setAuth(true);
    // }
    return (
        <AuthContext.Provider value={{ isAuth, setAuth, token, setToken, admin, setAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
