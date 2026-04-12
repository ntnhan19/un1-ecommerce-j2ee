// Hàm format tiền tệ (VNĐ)
export const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return '0 ₫';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

// Hàm lấy nhãn trạng thái đơn hàng
export const getStatusLabel = (status) => {
    const statusMap = {
        PENDING: 'Chờ xử lý',
        CONFIRMED: 'Đã xác nhận',
        SHIPPING: 'Đang giao',
        DELIVERED: 'Đã giao',
        CANCELED: 'Đã hủy',
    };
    return statusMap[status] || status;
};

// Hàm lấy nhãn phương thức vận chuyển
export const getShippingLabel = (method) => {
    const shippingMap = {
        STANDARD: 'Giao hàng tiêu chuẩn',
        EXPRESS: 'Giao hàng hỏa tốc',
    };
    return shippingMap[method] || method;
};

// Hàm lấy nhãn phương thức thanh toán
export const getPaymentLabel = (method) => {
    const paymentMap = {
        COD: 'Thanh toán khi nhận hàng (COD)',
        BANKING: 'Chuyển khoản ngân hàng',
        VNPAY: 'VNPAY',
        MOMO: 'Ví MoMo'
    };
    return paymentMap[method] || method;
};