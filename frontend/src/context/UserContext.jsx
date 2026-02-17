// src/context/UserContext.jsx
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [addresses, setAddresses] = useState([]);

    // Load user data from localStorage on mount
    useEffect(() => {
        // Disabled auto-login from localStorage
        // User must explicitly login through LoginForm
        // const savedUser = localStorage.getItem('user');
        // if (savedUser) {
        //     try {
        //         setUser(JSON.parse(savedUser));
        //     } catch (error) {
        //         console.error('Error loading user:', error);
        //     }
        // }

        const savedAddresses = localStorage.getItem('addresses');
        if (savedAddresses) {
            try {
                setAddresses(JSON.parse(savedAddresses));
            } catch (error) {
                console.error('Error loading addresses:', error);
            }
        }
    }, []);

    // Save user to localStorage whenever it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        }
    }, [user]);

    // Save addresses to localStorage whenever they change
    useEffect(() => {
        if (addresses.length >= 0) {
            localStorage.setItem('addresses', JSON.stringify(addresses));
        }
    }, [addresses]);

    // Update user profile
    const updateProfile = (profileData) => {
        setUser(prevUser => ({
            ...prevUser,
            ...profileData
        }));
    };

    // Add new address
    const addAddress = (addressData) => {
        const newAddress = {
            id: Date.now().toString(),
            ...addressData,
            createdAt: new Date().toISOString()
        };
        setAddresses(prevAddresses => [...prevAddresses, newAddress]);
        return newAddress;
    };

    // Update existing address
    const updateAddress = (addressId, addressData) => {
        setAddresses(prevAddresses =>
            prevAddresses.map(addr =>
                addr.id === addressId ? { ...addr, ...addressData } : addr
            )
        );
    };

    // Delete address
    const deleteAddress = (addressId) => {
        setAddresses(prevAddresses =>
            prevAddresses.filter(addr => addr.id !== addressId)
        );
    };

    // Set default address
    const setDefaultAddress = (addressId) => {
        setAddresses(prevAddresses =>
            prevAddresses.map(addr => ({
                ...addr,
                isDefault: addr.id === addressId
            }))
        );
    };

    // Login user (mock - will be replaced with real auth)
    const login = (userData) => {
        setUser(userData);
    };

    // Logout user
    const logout = () => {
        setUser(null);
        setAddresses([]);
        localStorage.removeItem('user');
        localStorage.removeItem('addresses');
    };

    return (
        <UserContext.Provider value={{
            user,
            addresses,
            updateProfile,
            addAddress,
            updateAddress,
            deleteAddress,
            setDefaultAddress,
            login,
            logout
        }}>
            {children}
        </UserContext.Provider>
    );
};
