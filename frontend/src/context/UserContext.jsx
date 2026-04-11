import { createContext, useEffect, useState } from 'react';
import profileService from '../services/profileService';
import { useAuth } from './AuthContext';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAddresses = async () => {
            if (!isAuthenticated) {
                setAddresses([]);
                return;
            }

            setLoading(true);
            try {
                const data = await profileService.getAddresses();
                setAddresses(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Error loading addresses:', error);
                setAddresses([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAddresses();
    }, [isAuthenticated]);

    const refreshAddresses = async () => {
        if (!isAuthenticated) {
            setAddresses([]);
            return [];
        }

        setLoading(true);
        try {
            const data = await profileService.getAddresses();
            const nextAddresses = Array.isArray(data) ? data : [];
            setAddresses(nextAddresses);
            return nextAddresses;
        } finally {
            setLoading(false);
        }
    };

    const addAddress = async (addressData) => {
        const newAddress = await profileService.createAddress(addressData);
        await refreshAddresses();
        return newAddress;
    };

    const updateAddress = async (addressId, addressData) => {
        const updatedAddress = await profileService.updateAddress(addressId, addressData);
        await refreshAddresses();
        return updatedAddress;
    };

    const deleteAddress = async (addressId) => {
        await profileService.deleteAddress(addressId);
        await refreshAddresses();
    };

    const setDefaultAddress = async (addressId) => {
        const updatedAddress = await profileService.setDefaultAddress(addressId);
        await refreshAddresses();
        return updatedAddress;
    };

    return (
        <UserContext.Provider value={{
            addresses,
            loading,
            refreshAddresses,
            addAddress,
            updateAddress,
            deleteAddress,
            setDefaultAddress
        }}>
            {children}
        </UserContext.Provider>
    );
};
