import {createContext, useContext, useState, useEffect} from 'react';
import type {ReactNode} from 'react';
import {setAuthToken} from '../services/api';
import type {AuthUser} from '../types';
import {decodeToken} from '../utils/jwt.utils';

const STORAGE_KEY = 'crf_token';

interface AuthContextValue {
    token: string | null;
    user: AuthUser | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({children}: {children: ReactNode}) {

    const [token,setToken] = useState<string | null>(() => localStorage.getItem(STORAGE_KEY));
    const [user,setUser] = useState<AuthUser | null>(()  => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? decodeToken(stored) : null;
    });

    useEffect(() => {
        setAuthToken(token);
    }, [token]);

    function login(newToken: string) {
        localStorage.setItem(STORAGE_KEY, newToken);
        setToken(newToken);
        setUser(decodeToken(newToken));
    }

    function logout() {
        localStorage.removeItem(STORAGE_KEY);
        setToken(null);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{token, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}
    export function useAuth() : AuthContextValue {
        const ctx = useContext(AuthContext);
        if (!ctx) {
            throw new Error('useAuth debe usarse dentro de AuthProvider');
        }
        return ctx;
    }
