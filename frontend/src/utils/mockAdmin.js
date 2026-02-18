// Mock data for Admin Dashboard

export const mockRevenueData = [
    { month: 'T8/2025', revenue: 45200000, orders: 38 },
    { month: 'T9/2025', revenue: 52800000, orders: 45 },
    { month: 'T10/2025', revenue: 61500000, orders: 52 },
    { month: 'T11/2025', revenue: 78900000, orders: 67 },
    { month: 'T12/2025', revenue: 95400000, orders: 81 },
    { month: 'T1/2026', revenue: 83200000, orders: 70 },
];

export const mockDashboardStats = {
    totalRevenue: 417000000,
    totalOrders: 353,
    totalProducts: 24,
    totalCustomers: 218,
    revenueGrowth: +12.5,
    ordersGrowth: +8.3,
    productsGrowth: +4,
    customersGrowth: +15.2,
};

export const mockOrders = [
    {
        id: 'UN1-2026-001',
        customer: 'Nguyễn Văn An',
        email: 'an.nguyen@email.com',
        phone: '0901234567',
        date: '2026-02-18',
        items: [
            { name: 'ÁO NỈ CỔ KHÓA KÉO CƠ BẢN', size: 'M', color: 'Đen', quantity: 1, price: 1399000 },
            { name: 'QUẦN JOGGER RELAXED FIT', size: 'L', color: 'Đen', quantity: 1, price: 1199000 },
        ],
        total: 2598000,
        shippingFee: 50000,
        shippingMethod: 'express',
        paymentMethod: 'cod',
        status: 'pending',
        address: '123 Nguyễn Huệ, P. Bến Nghé, Q.1, TP.HCM',
    },
    {
        id: 'UN1-2026-002',
        customer: 'Trần Thị Bình',
        email: 'binh.tran@email.com',
        phone: '0912345678',
        date: '2026-02-17',
        items: [
            { name: 'ÁO KHOÁC PHA LEN', size: 'S', color: 'Be', quantity: 1, price: 1179000 },
        ],
        total: 1179000,
        shippingFee: 30000,
        shippingMethod: 'standard',
        paymentMethod: 'vnpay',
        status: 'processing',
        address: '45 Lê Lợi, P. Bến Thành, Q.1, TP.HCM',
    },
    {
        id: 'UN1-2026-003',
        customer: 'Lê Minh Cường',
        email: 'cuong.le@email.com',
        phone: '0923456789',
        date: '2026-02-16',
        items: [
            { name: 'ÁO KHOÁC VẠT ĐẮP CHÉO', size: 'L', color: 'Đen', quantity: 1, price: 3999000 },
            { name: 'QUẦN JEANS STRAIGHT FIT', size: 'L', color: 'Xanh', quantity: 2, price: 2798000 },
        ],
        total: 6797000,
        shippingFee: 50000,
        shippingMethod: 'express',
        paymentMethod: 'momo',
        status: 'shipped',
        address: '78 Đinh Tiên Hoàng, P.3, Q. Bình Thạnh, TP.HCM',
    },
    {
        id: 'UN1-2026-004',
        customer: 'Phạm Thị Dung',
        email: 'dung.pham@email.com',
        phone: '0934567890',
        date: '2026-02-15',
        items: [
            { name: 'ÁO KHOÁC LÔNG NHÂN TẠO', size: 'M', color: 'Trắng kem', quantity: 1, price: 2599000 },
        ],
        total: 2599000,
        shippingFee: 80000,
        shippingMethod: 'same-day',
        paymentMethod: 'bank',
        status: 'delivered',
        address: '12 Võ Văn Tần, P.6, Q.3, TP.HCM',
    },
    {
        id: 'UN1-2026-005',
        customer: 'Hoàng Văn Em',
        email: 'em.hoang@email.com',
        phone: '0945678901',
        date: '2026-02-14',
        items: [
            { name: 'ÁO PHÔNG IN HỌA TIẾT', size: 'XL', color: 'Trắng', quantity: 3, price: 2697000 },
        ],
        total: 2697000,
        shippingFee: 30000,
        shippingMethod: 'standard',
        paymentMethod: 'cod',
        status: 'cancelled',
        address: '56 Cách Mạng Tháng 8, P.10, Q.3, TP.HCM',
    },
    {
        id: 'UN1-2026-006',
        customer: 'Vũ Thị Phương',
        email: 'phuong.vu@email.com',
        phone: '0956789012',
        date: '2026-02-13',
        items: [
            { name: 'QUẦN BALLOON (Z W COLLEC.)', size: 'S', color: 'Đen', quantity: 1, price: 1499000 },
            { name: 'ÁO PHÔNG THE MUPPETS', size: 'S', color: 'Trắng', quantity: 1, price: 799000 },
        ],
        total: 2298000,
        shippingFee: 50000,
        shippingMethod: 'express',
        paymentMethod: 'vnpay',
        status: 'delivered',
        address: '34 Nguyễn Thị Minh Khai, P.6, Q.3, TP.HCM',
    },
    {
        id: 'UN1-2026-007',
        customer: 'Đặng Quốc Hùng',
        email: 'hung.dang@email.com',
        phone: '0967890123',
        date: '2026-02-12',
        items: [
            { name: 'ÁO KHOÁC REGULAR FIT', size: 'L', color: 'Đen', quantity: 1, price: 3199000 },
        ],
        total: 3199000,
        shippingFee: 30000,
        shippingMethod: 'standard',
        paymentMethod: 'momo',
        status: 'processing',
        address: '89 Hai Bà Trưng, P. Bến Nghé, Q.1, TP.HCM',
    },
    {
        id: 'UN1-2026-008',
        customer: 'Ngô Thị Lan',
        email: 'lan.ngo@email.com',
        phone: '0978901234',
        date: '2026-02-11',
        items: [
            { name: 'ÁO KHOÁC DÁNG DÀI PHA LEN', size: 'M', color: 'Camel', quantity: 1, price: 4799000 },
        ],
        total: 4799000,
        shippingFee: 50000,
        shippingMethod: 'express',
        paymentMethod: 'bank',
        status: 'shipped',
        address: '23 Trần Hưng Đạo, P. Nguyễn Cư Trinh, Q.1, TP.HCM',
    },
];

// Color name → hex mapping (Vietnamese color names)
export const COLOR_MAP = {
    'Đen': '#000000',
    'Trắng': '#FFFFFF',
    'Xám': '#808080',
    'Xám đậm': '#696969',
    'Xanh dương đậm': '#060A12',
    'Xanh navy': '#000080',
    'Xanh': '#1a3a5c',
    'Vàng rơm': '#DAC19A',
    'Be': '#D4C5B9',
    'Nâu': '#8B4513',
    'Camel': '#C19A6B',
    'Trắng kem': '#F5F5DC',
    'Hồng pastel': '#FFB6C1',
    'Đỏ': '#DC2626',
    'Cam': '#F97316',
    'Vàng': '#EAB308',
    'Xanh lá': '#16A34A',
    'Tím': '#7C3AED',
};

// Helper: get hex for a color name, fallback to a neutral grey
export const getColorHex = (name) => COLOR_MAP[name] || '#CCCCCC';

export const mockAdminProducts = [
    {
        id: 1,
        name: 'ÁO NỈ CỔ KHÓA KÉO CƠ BẢN',
        category: 'nam',
        price: 1399000,
        stock: 45,
        status: 'active',
        image: '/src/assets/images/products/man/1.png',
        colors: [
            { name: 'Đen', hex: '#000000' },
            { name: 'Xanh dương đậm', hex: '#060A12' },
            { name: 'Vàng rơm', hex: '#DAC19A' },
        ],
        sizes: ['S', 'M', 'L', 'XL'],
    },
    {
        id: 2,
        name: 'ÁO KHOÁC VẢI DỆT',
        category: 'nam',
        price: 2599000,
        stock: 23,
        status: 'active',
        image: '/src/assets/images/products/man/2.png',
        colors: [
            { name: 'Đen', hex: '#000000' },
            { name: 'Xám', hex: '#808080' },
        ],
        sizes: ['S', 'M', 'L', 'XL'],
    },
    {
        id: 3,
        name: 'ÁO KHOÁC VẠT ĐẮP CHÉO',
        category: 'nam',
        price: 3999000,
        stock: 12,
        status: 'active',
        image: '/src/assets/images/products/man/3.png',
        colors: [
            { name: 'Đen', hex: '#000000' },
        ],
        sizes: ['S', 'M', 'L', 'XL'],
    },
    {
        id: 4,
        name: 'ÁO KHOÁC REGULAR FIT',
        category: 'nam',
        price: 3199000,
        stock: 0,
        status: 'out_of_stock',
        image: '/src/assets/images/products/man/12.png',
        colors: [
            { name: 'Đen', hex: '#000000' },
            { name: 'Xanh', hex: '#1a3a5c' },
        ],
        sizes: ['S', 'M', 'L', 'XL'],
    },
    {
        id: 5,
        name: 'ÁO PHÔNG DỆT KIM',
        category: 'nam',
        price: 1199000,
        stock: 67,
        status: 'active',
        image: '/src/assets/images/products/man/11.png',
        colors: [
            { name: 'Trắng', hex: '#FFFFFF' },
            { name: 'Đen', hex: '#000000' },
        ],
        sizes: ['S', 'M', 'L', 'XL'],
    },
    {
        id: 6,
        name: 'QUẦN JOGGER RELAXED FIT',
        category: 'nam',
        price: 1199000,
        stock: 34,
        status: 'active',
        image: '/src/assets/images/products/man/7.png',
        colors: [
            { name: 'Đen', hex: '#000000' },
            { name: 'Xám', hex: '#808080' },
        ],
        sizes: ['S', 'M', 'L', 'XL'],
    },
    {
        id: 7,
        name: 'ÁO KHOÁC PHA LEN',
        category: 'nu',
        price: 1179000,
        stock: 28,
        status: 'active',
        image: '/src/assets/images/products/woman/1.png',
        colors: [
            { name: 'Be', hex: '#D4C5B9' },
            { name: 'Đen', hex: '#000000' },
            { name: 'Xám', hex: '#808080' },
        ],
        sizes: ['S', 'M', 'L', 'XL'],
    },
    {
        id: 8,
        name: 'ÁO KHOÁC LÔNG NHÂN TẠO',
        category: 'nu',
        price: 2599000,
        stock: 15,
        status: 'active',
        image: '/src/assets/images/products/woman/2.png',
        colors: [
            { name: 'Trắng kem', hex: '#F5F5DC' },
            { name: 'Nâu', hex: '#8B4513' },
        ],
        sizes: ['S', 'M', 'L', 'XL'],
    },
    {
        id: 9,
        name: 'ÁO KHOÁC DÁNG DÀI PHA LEN',
        category: 'nu',
        price: 4799000,
        stock: 8,
        status: 'active',
        image: '/src/assets/images/products/woman/3.png',
        colors: [
            { name: 'Xám đậm', hex: '#696969' },
            { name: 'Đen', hex: '#000000' },
            { name: 'Camel', hex: '#C19A6B' },
        ],
        sizes: ['S', 'M', 'L', 'XL'],
    },
    {
        id: 10,
        name: 'ÁO PHÔNG THE MUPPETS',
        category: 'nu',
        price: 799000,
        stock: 52,
        status: 'active',
        image: '/src/assets/images/products/woman/5.png',
        colors: [
            { name: 'Trắng', hex: '#FFFFFF' },
            { name: 'Đen', hex: '#000000' },
            { name: 'Xám', hex: '#808080' },
        ],
        sizes: ['S', 'M', 'L', 'XL'],
    },
    {
        id: 11,
        name: 'QUẦN BALLOON (Z W COLLEC.)',
        category: 'nu',
        price: 1499000,
        stock: 0,
        status: 'out_of_stock',
        image: '/src/assets/images/products/woman/10.png',
        colors: [
            { name: 'Đen', hex: '#000000' },
            { name: 'Be', hex: '#D4C5B9' },
            { name: 'Xanh navy', hex: '#000080' },
        ],
        sizes: ['S', 'M', 'L', 'XL'],
    },
    {
        id: 12,
        name: 'QUẦN NẾT LY ỐNG RỘNG',
        category: 'nu',
        price: 1099000,
        stock: 19,
        status: 'active',
        image: '/src/assets/images/products/woman/11.png',
        colors: [
            { name: 'Đen', hex: '#000000' },
            { name: 'Xám', hex: '#808080' },
            { name: 'Be', hex: '#D4C5B9' },
        ],
        sizes: ['S', 'M', 'L', 'XL'],
    },
];

export const mockTopProducts = [
    { name: 'ÁO KHOÁC DÁNG DÀI PHA LEN', category: 'Nữ', sold: 42, revenue: 201558000 },
    { name: 'ÁO KHOÁC VẠT ĐẮP CHÉO', category: 'Nam', sold: 38, revenue: 151962000 },
    { name: 'ÁO KHOÁC LÔNG NHÂN TẠO', category: 'Nữ', sold: 35, revenue: 90965000 },
    { name: 'ÁO KHOÁC REGULAR FIT', category: 'Nam', sold: 31, revenue: 99169000 },
    { name: 'ÁO NỈ CỔ KHÓA KÉO CƠ BẢN', category: 'Nam', sold: 28, revenue: 39172000 },
];

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 0,
    }).format(amount);
};

export const getStatusLabel = (status) => {
    const labels = {
        pending: 'Chờ xử lý',
        processing: 'Đang xử lý',
        shipped: 'Đang giao',
        delivered: 'Đã giao',
        cancelled: 'Đã hủy',
    };
    return labels[status] || status;
};

export const getShippingLabel = (method) => {
    const labels = {
        standard: 'Tiêu chuẩn',
        express: 'Nhanh',
        'same-day': 'Trong ngày',
    };
    return labels[method] || method;
};

// Returns shipping fee based on method (fallback: use order.shippingFee if present)
export const getShippingFee = (method) => {
    const fees = {
        standard: 30000,
        express: 50000,
        'same-day': 80000,
    };
    return fees[method] ?? 30000;
};

export const getPaymentLabel = (method) => {
    const labels = {
        cod: 'COD',
        vnpay: 'VNPay',
        momo: 'Momo',
        bank: 'Chuyển khoản',
    };
    return labels[method] || method;
};
