// src/context/OrderContext.jsx
import { createContext, useState, useEffect } from "react";

export const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);

    // Load orders from localStorage on mount
    useEffect(() => {
        const savedOrders = localStorage.getItem('orders');
        if (savedOrders) {
            try {
                setOrders(JSON.parse(savedOrders));
            } catch (error) {
                console.error('Error loading orders:', error);
            }
        }
    }, []);

    // Save orders to localStorage whenever they change
    useEffect(() => {
        if (orders.length > 0) {
            localStorage.setItem('orders', JSON.stringify(orders));
        }
    }, [orders]);

    const addOrder = (orderData) => {
        const newOrder = {
            id: Date.now().toString(),
            orderNumber: `ORD-${new Date().getFullYear()}-${String(orders.length + 1).padStart(3, '0')}`,
            date: new Date().toISOString(),
            status: 'PENDING',
            totalAmount: orderData.totalAmount,
            shippingAddress: `${orderData.shippingInfo.detailAddress}, ${orderData.shippingInfo.ward}, ${orderData.shippingInfo.district}, ${orderData.shippingInfo.province}`,
            trackingNumber: `VN${Date.now().toString().slice(-9)}`,
            items: orderData.items,
            shippingMethod: orderData.shippingMethod,
            paymentMethod: orderData.paymentMethod,
            shippingCost: orderData.shippingCost,
            customerName: `${orderData.shippingInfo.firstName} ${orderData.shippingInfo.lastName}`,
            customerEmail: orderData.shippingInfo.email,
            customerPhone: orderData.shippingInfo.phone
        };

        setOrders(prevOrders => [newOrder, ...prevOrders]);
        return newOrder;
    };

    const updateOrderStatus = (orderId, newStatus) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );
    };

    const clearOrders = () => {
        setOrders([]);
        localStorage.removeItem('orders');
    };

    return (
        <OrderContext.Provider value={{
            orders,
            addOrder,
            updateOrderStatus,
            clearOrders
        }}>
            {children}
        </OrderContext.Provider>
    );
};
