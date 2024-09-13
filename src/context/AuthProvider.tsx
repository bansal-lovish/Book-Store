import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext<any>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [authUser, setAuthUser] = useState<any>();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                const initialAuthUser = JSON.parse(window.sessionStorage.getItem("user") as string);
         
                setAuthUser(initialAuthUser);
            } catch (error) {
                console.log("Failed to parse auth user from sessionStorage:", error);
                // setAuthUser(undefined);
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={[authUser, setAuthUser]}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
