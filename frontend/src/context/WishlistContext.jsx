// src/context/WishlistContext.jsx
import { createContext, useState, useEffect, useMemo } from "react";

export const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
    // Initialize from localStorage
    const [wishlist, setWishlist] = useState(() => {
        const saved = localStorage.getItem("wishlist");
        return saved ? JSON.parse(saved) : [];
    });

    // Persist to localStorage whenever wishlist changes
    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (product) => {
        setWishlist((items) => {
            const exists = items.find((i) => i.id === product.id);
            if (exists) {
                return items; // Already in wishlist
            }
            return [...items, product];
        });
    };

    const removeFromWishlist = (productId) => {
        setWishlist((items) => items.filter((i) => i.id !== productId));
    };

    const isInWishlist = (productId) => {
        return wishlist.some((i) => i.id === productId);
    };

    const clearWishlist = () => {
        setWishlist([]);
    };

    const totalWishlistItems = useMemo(() => wishlist.length, [wishlist]);

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
                clearWishlist,
                totalWishlistItems,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};
