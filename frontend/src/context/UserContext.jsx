// src/context/UserContext.jsx
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [addresses, setAddresses] = useState([]);

    // Load addresses from localStorage on mount
    useEffect(() => {
        const savedAddresses = localStorage.getItem('addresses');
        if (savedAddresses) {
            try {
                setAddresses(JSON.parse(savedAddresses));
            } catch (error) {
                console.error('Error loading addresses:', error);
            }
        }
    }, []);

    // Save addresses to localStorage whenever they change
    useEffect(() => {
        if (addresses.length >= 0) {
            localStorage.setItem('addresses', JSON.stringify(addresses));
        }
    }, [addresses]);

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

    return (
        <UserContext.Provider value={{
            addresses,
            addAddress,
            updateAddress,
            deleteAddress,
            setDefaultAddress
        }}>
            {children}
        </UserContext.Provider>
    );
};
