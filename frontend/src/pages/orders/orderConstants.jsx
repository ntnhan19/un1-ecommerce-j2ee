import React from 'react';
import { OrderStatus } from './orderTypes';

export const MOCK_ORDERS = [
    {
        id: '1',
        orderNumber: 'ORD-2024-001',
        date: '2024-05-15T10:30:00Z',
        status: OrderStatus.COMPLETED,
        totalAmount: 1250000,
        shippingAddress: '123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh',
        trackingNumber: 'VN123456789',
        items: [
            { id: 'i1', name: 'Tai nghe Bluetooth Sony WH-1000XM4', price: 6500000, quantity: 1, image: 'https://picsum.photos/200/200?random=1' }
        ]
    },
    {
        id: '2',
        orderNumber: 'ORD-2024-005',
        date: '2024-05-20T14:45:00Z',
        status: OrderStatus.SHIPPING,
        totalAmount: 3200000,
        shippingAddress: '456 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh',
        trackingNumber: 'VN987654321',
        items: [
            { id: 'i3', name: 'Bàn phím cơ Keychron K2', price: 1800000, quantity: 1, image: 'https://picsum.photos/200/200?random=3' }
        ]
    }
];

export const Icons = {
    Package: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg>
    ),
    ChevronRight: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
    ),
    Search: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
    ),
    EmptyState: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>
    )
};
