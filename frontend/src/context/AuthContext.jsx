import { createContext, useContext, useEffect, useState } from 'react';
import authService from '../services/authService';
import profileService from '../services/profileService';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            const savedUser = authService.getCurrentUser();
            const savedToken = authService.getToken();

            if (savedUser && savedToken) {
                setUser(savedUser);
                setToken(savedToken);

                try {
                    const profile = await profileService.getProfile();
                    authService.setCurrentUser(profile);
                    setUser(profile);
                } catch (error) {
                    authService.logout();
                    setUser(null);
                    setToken(null);
                }
            }

            setLoading(false);
        };

        initializeAuth();
    }, []);

    const login = async (email, password) => {
        const data = await authService.login(email, password);
        setUser(data.user);
        setToken(data.token);
        return data;
    };

    const googleLogin = async (idToken) => {
        const data = await authService.googleLogin(idToken);
        setUser(data.user);
        setToken(data.token);
        return data;
    };

    const register = async (userData) => {
        return await authService.register(userData);
    };

    const refreshUser = async () => {
        const profile = await profileService.getProfile();
        authService.setCurrentUser(profile);
        setUser(profile);
        return profile;
    };

    const updateUser = (nextUser) => {
        authService.setCurrentUser(nextUser);
        setUser(nextUser);
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            loading,
            login,
            googleLogin,
            register,
            refreshUser,
            updateUser,
            logout,
            isAuthenticated: !!token
        }}>
            {children}
        </AuthContext.Provider>
    );
};
