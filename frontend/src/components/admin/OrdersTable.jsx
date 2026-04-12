import React, { useState, useEffect } from 'react';
import orderService from '../../services/orderService';
import {
    formatCurrency,
    getStatusLabel,
    getShippingLabel,
    getPaymentLabel,
} from '../../utils/formatters';
import '../../styles/components/Admin.css';

// Hàm tính phí vận chuyển tạm thời (nếu backend không trả về shippingFee)
const getShippingFee = (method) => {
    return method === 'express' ? 50000 : 30000;
};

const STATUS_FILTERS = [
    { key: 'all', label: 'Tất cả' },
    { key: 'PENDING', label: 'Chờ xử lý' },
    { key: 'CONFIRMED', label: 'Đã xác nhận' },
    { key: 'SHIPPING', label: 'Đang giao' },
    { key: 'DELIVERED', label: 'Đã giao' },
    { key: 'CANCELED', label: 'Đã hủy' },
];

const STATUS_OPTIONS = ['PENDING', 'CONFIRMED', 'SHIPPING', 'DELIVERED', 'CANCELED'];

// ─── Email Templates ──────────────────────────────────────────────────────────
const EMAIL_TEMPLATES = [
    {
        key: 'confirm',
        label: 'Xác nhận đơn hàng',
        subject: (order) => `[UN1] Xác nhận đơn hàng ${order.id}`,
        body: (order) =>
            `Kính gửi ${order.customer},\n\nCảm ơn bạn đã đặt hàng tại UN1!\n\nĐơn hàng ${order.id} của bạn đã được xác nhận thành công.\nTổng giá trị: ${formatCurrency(order.total)}\nNgày đặt: ${order.date || order.createdAt}\n\nChúng tôi sẽ thông báo khi đơn hàng được giao đến bạn.\n\nTrân trọng,\nĐội ngũ UN1`,
    },
    {
        key: 'shipped',
        label: 'Thông báo giao hàng',
        subject: (order) => `[UN1] Đơn hàng ${order.id} đang được giao`,
        body: (order) =>
            `Kính gửi ${order.customer},\n\nĐơn hàng ${order.id} của bạn đang trên đường giao đến bạn.\nPhương thức vận chuyển: ${getShippingLabel(order.shippingMethod)}\n\nVui lòng chú ý điện thoại để nhận hàng.\n\nTrân trọng,\nĐội ngũ UN1`,
    },
    {
        key: 'delivered',
        label: 'Xác nhận đã nhận hàng',
        subject: (order) => `[UN1] Cảm ơn bạn đã mua hàng — Đơn ${order.id}`,
        body: (order) =>
            `Kính gửi ${order.customer},\n\nĐơn hàng ${order.id} đã được giao thành công!\n\nChúng tôi hy vọng bạn hài lòng với sản phẩm. Nếu có bất kỳ vấn đề gì, hãy liên hệ với chúng tôi.\n\nHẹn gặp lại bạn tại UN1!\n\nTrân trọng,\nĐội ngũ UN1`,
    },
    {
        key: 'custom',
        label: 'Nội dung tùy chỉnh',
        subject: () => '',
        body: () => '',
    },
];

// ─── Voucher Presets ──────────────────────────────────────────────────────────
const VOUCHER_PRESETS = [
    { code: 'THANK10', discount: '10%', description: 'Giảm 10% cho đơn tiếp theo', minOrder: 500000 },
    { code: 'LOYAL15', discount: '15%', description: 'Ưu đãi khách hàng thân thiết', minOrder: 800000 },
    { code: 'GIFT50K', discount: '50.000đ', description: 'Giảm 50.000đ cho đơn từ 300K', minOrder: 300000 },
    { code: 'GIFT100K', discount: '100.000đ', description: 'Giảm 100.000đ cho đơn từ 700K', minOrder: 700000 },
    { code: 'NEWSEASON20', discount: '20%', description: 'Ưu đãi mùa mới — giảm 20%', minOrder: 1000000 },
];

// ─── Toast Notification ───────────────────────────────────────────────────────
const Toast = ({ message, type, onClose }) => (
    <div style={{
        position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999,
        background: type === 'success' ? '#16a34a' : '#dc2626',
        color: '#fff', padding: '0.9rem 1.5rem', borderRadius: 10,
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        fontSize: '0.9rem', fontWeight: 500, animation: 'fadeInUp 0.3s ease',
        maxWidth: 360,
    }}>
        <span style={{ fontSize: '1.2rem' }}>{type === 'success' ? '✅' : '❌'}</span>
        <span style={{ flex: 1 }}>{message}</span>
        <button onClick={onClose} style={{
            background: 'none', border: 'none', color: '#fff',
            cursor: 'pointer', fontSize: '1rem', padding: 0, opacity: 0.8,
        }}>✕</button>
    </div>
);

// ─── Send Mail + Voucher Modal (gộp) ────────────────────────────────────────
const SendMailModal = ({ order, onClose, onSent }) => {
    const [tab, setTab] = useState('email');
    const [selectedTemplate, setSelectedTemplate] = useState('confirm');
    const [subject, setSubject] = useState(() => EMAIL_TEMPLATES[0].subject(order));
    const [body, setBody] = useState(() => EMAIL_TEMPLATES[0].body(order));

    const [includeVoucher, setIncludeVoucher] = useState(false);
    const [voucherMode, setVoucherMode] = useState('preset');
    const [selectedPreset, setSelectedPreset] = useState(null);
    const [customCode, setCustomCode] = useState('');
    const [customDiscount, setCustomDiscount] = useState('');
    const [customDesc, setCustomDesc] = useState('');
    const [expiry, setExpiry] = useState('');
    const [sending, setSending] = useState(false);

    const handleTemplateChange = (key) => {
        setSelectedTemplate(key);
        const tpl = EMAIL_TEMPLATES.find((t) => t.key === key);
        if (key !== 'custom') {
            setSubject(tpl.subject(order));
            setBody(tpl.body(order));
        }
    };

    const activeVoucher = voucherMode === 'preset' ? selectedPreset : {
        code: customCode, discount: customDiscount, description: customDesc,
    };
    const voucherValid = !includeVoucher || (activeVoucher?.code && activeVoucher?.discount);
    const canSend = subject.trim() && body.trim() && voucherValid;

    const handleSend = () => {
        if (!canSend) return;
        setSending(true);
        // Ở đây đáng lý sẽ gọi api send mail (vd: orderService.sendMail), tạm thời dùng timeout mô phỏng
        setTimeout(() => {
            setSending(false);
            const voucherMsg = includeVoucher && activeVoucher?.code
                ? ` kèm voucher ${activeVoucher.code}` : '';
            onSent(`Email${voucherMsg} đã gửi thành công đến ${order.email}`);
            onClose();
        }, 1200);
    };

    return (
        <div className="admin-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="admin-modal" style={{ maxWidth: 660 }}>
                <div className="admin-modal-header">
                    <span className="admin-modal-title">Gửi mail cho khách — {order.id}</span>
                    <button className="admin-modal-close" onClick={onClose}>✕</button>
                </div>
                <div className="admin-modal-body">
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '0.75rem',
                        padding: '0.65rem 1rem', background: '#f0f7ff',
                        borderRadius: 8, marginBottom: '1.25rem', border: '1px solid #bfdbfe',
                    }}>
                        <div style={{
                            width: 34, height: 34, borderRadius: '50%', background: '#333',
                            color: '#fff', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', fontWeight: 700, fontSize: '0.88rem', flexShrink: 0,
                        }}>{order.customer?.charAt(0).toUpperCase() || 'U'}</div>
                        <div>
                            <div style={{ fontWeight: 600, color: '#333', fontSize: '0.87rem' }}>{order.customer}</div>
                            <div style={{ color: '#2563eb', fontSize: '0.8rem', fontWeight: 500 }}>{order.email}</div>
                        </div>
                        <div style={{ marginLeft: 'auto', fontSize: '0.77rem', color: '#666' }}>
                            Đơn: <strong>{order.id}</strong>
                        </div>
                    </div>

                    <div style={{ display: 'flex', borderBottom: '2px solid #f0f0f0', marginBottom: '1.1rem' }}>
                        {[
                            { key: 'email', label: 'Nội dung email' },
                            { key: 'voucher', label: 'Tặng voucher' },
                        ].map((t) => (
                            <button
                                key={t.key}
                                type="button"
                                onClick={() => setTab(t.key)}
                                style={{
                                    padding: '0.5rem 1.1rem', border: 'none', background: 'none',
                                    cursor: 'pointer', fontSize: '0.85rem', fontWeight: tab === t.key ? 700 : 500,
                                    color: tab === t.key ? '#333' : '#888',
                                    borderBottom: tab === t.key ? '2.5px solid #333' : '2.5px solid transparent',
                                    marginBottom: -2, transition: 'all 0.15s',
                                }}
                            >{t.label}</button>
                        ))}
                    </div>

                    {tab === 'email' && (
                        <>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', color: '#555', marginBottom: '0.45rem' }}>Mẫu email</label>
                                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                                    {EMAIL_TEMPLATES.map((tpl) => (
                                        <button
                                            key={tpl.key}
                                            type="button"
                                            onClick={() => handleTemplateChange(tpl.key)}
                                            style={{
                                                padding: '0.35rem 0.8rem', borderRadius: 20,
                                                border: selectedTemplate === tpl.key ? '2px solid #333' : '1.5px solid #e0e0e0',
                                                background: selectedTemplate === tpl.key ? '#333' : '#fff',
                                                color: selectedTemplate === tpl.key ? '#fff' : '#555',
                                                fontSize: '0.77rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s',
                                            }}
                                        >{tpl.label}</button>
                                    ))}
                                </div>
                            </div>
                            <div className="admin-form-group" style={{ marginBottom: '0.8rem' }}>
                                <label>Tiêu đề *</label>
                                <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Tiêu đề email..." />
                            </div>
                            <div className="admin-form-group">
                                <label>Nội dung *</label>
                                <textarea
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                    rows={8}
                                    placeholder="Nội dung email..."
                                    style={{ lineHeight: 1.6 }}
                                />
                            </div>
                        </>
                    )}

                    {tab === 'voucher' && (
                        <>
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '0.75rem',
                                padding: '0.75rem 1rem', background: includeVoucher ? '#fdf4ff' : '#fafafa',
                                borderRadius: 8, border: `1.5px solid ${includeVoucher ? '#e9d5ff' : '#e0e0e0'}`,
                                marginBottom: '1rem', cursor: 'pointer', transition: 'all 0.2s',
                            }} onClick={() => setIncludeVoucher(!includeVoucher)}>
                                <div style={{
                                    width: 20, height: 20, borderRadius: 4, flexShrink: 0,
                                    border: `2px solid ${includeVoucher ? '#7c3aed' : '#ccc'}`,
                                    background: includeVoucher ? '#7c3aed' : '#fff',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    transition: 'all 0.15s',
                                }}>
                                    {includeVoucher && <span style={{ color: '#fff', fontSize: '0.75rem', fontWeight: 700 }}>✓</span>}
                                </div>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '0.87rem', color: '#333' }}>Đính kèm voucher trong email</div>
                                    <div style={{ fontSize: '0.77rem', color: '#888', marginTop: '0.1rem' }}>Voucher sẽ được gửi cùng nội dung email</div>
                                </div>
                            </div>

                            {includeVoucher && (
                                <>
                                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.85rem' }}>
                                        {[
                                            { key: 'preset', label: '🎫 Voucher có sẵn' },
                                            { key: 'custom', label: '✏️ Tùy chỉnh' },
                                        ].map((m) => (
                                            <button key={m.key} type="button" onClick={() => setVoucherMode(m.key)}
                                                style={{
                                                    flex: 1, padding: '0.45rem 0.75rem',
                                                    border: voucherMode === m.key ? '2px solid #7c3aed' : '1.5px solid #e0e0e0',
                                                    borderRadius: 7,
                                                    background: voucherMode === m.key ? '#7c3aed' : '#fff',
                                                    color: voucherMode === m.key ? '#fff' : '#555',
                                                    fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                                                }}
                                            >{m.label}</button>
                                        ))}
                                    </div>

                                    {voucherMode === 'preset' && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                            {VOUCHER_PRESETS.map((v) => (
                                                <div key={v.code} onClick={() => setSelectedPreset(v)}
                                                    style={{
                                                        display: 'flex', alignItems: 'center', gap: '0.85rem',
                                                        padding: '0.7rem 0.9rem', borderRadius: 8, cursor: 'pointer',
                                                        border: selectedPreset?.code === v.code ? '2px solid #7c3aed' : '1.5px solid #e0e0e0',
                                                        background: selectedPreset?.code === v.code ? '#fdf4ff' : '#fafafa',
                                                        transition: 'all 0.15s',
                                                    }}
                                                >
                                                    <div style={{
                                                        background: selectedPreset?.code === v.code ? '#7c3aed' : '#e0e0e0',
                                                        color: selectedPreset?.code === v.code ? '#fff' : '#555',
                                                        borderRadius: 5, padding: '0.25rem 0.55rem',
                                                        fontWeight: 800, fontSize: '0.9rem', flexShrink: 0,
                                                        minWidth: 64, textAlign: 'center', transition: 'all 0.15s',
                                                    }}>{v.discount}</div>
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ fontWeight: 700, color: '#333', fontSize: '0.82rem', fontFamily: 'monospace' }}>{v.code}</div>
                                                        <div style={{ color: '#666', fontSize: '0.75rem' }}>{v.description}</div>
                                                    </div>
                                                    {selectedPreset?.code === v.code && <span style={{ color: '#7c3aed' }}>✓</span>}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {voucherMode === 'custom' && (
                                        <div className="admin-form-grid">
                                            <div className="admin-form-group">
                                                <label>Mã voucher *</label>
                                                <input value={customCode} onChange={(e) => setCustomCode(e.target.value.toUpperCase())}
                                                    placeholder="VD: SPECIAL30"
                                                    style={{ textTransform: 'uppercase', fontFamily: 'monospace', fontWeight: 600 }} />
                                            </div>
                                            <div className="admin-form-group">
                                                <label>Giá trị giảm *</label>
                                                <input value={customDiscount} onChange={(e) => setCustomDiscount(e.target.value)}
                                                    placeholder="VD: 20% hoặc 100.000đ" />
                                            </div>
                                            <div className="admin-form-group full-width">
                                                <label>Mô tả</label>
                                                <input value={customDesc} onChange={(e) => setCustomDesc(e.target.value)}
                                                    placeholder="VD: Ưu đãi đặc biệt dành riêng cho bạn" />
                                            </div>
                                            <div className="admin-form-group">
                                                <label>Ngày hết hạn</label>
                                                <input type="date" value={expiry} onChange={(e) => setExpiry(e.target.value)}
                                                    min={new Date().toISOString().split('T')[0]} />
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </div>
                <div className="admin-modal-footer">
                    <button className="admin-btn admin-btn-secondary" onClick={onClose}>Hủy</button>
                    <button
                        className="admin-btn admin-btn-primary"
                        onClick={handleSend}
                        disabled={sending || !canSend}
                        style={{ minWidth: 140, opacity: (!canSend || sending) ? 0.6 : 1 }}
                    >
                        {sending ? 'Đang gửi...' : includeVoucher ? 'Gửi mail + Voucher' : 'Gửi email'}
                    </button>
                </div>
            </div>
        </div>
    );
};

// ─── Order Detail Modal ───────────────────────────────────────────────────────
const OrderDetailModal = ({ order, onClose }) => {
    const items = order.items || [];
    const shippingFee = order.shippingFee ?? getShippingFee(order.shippingMethod);
    const itemsTotal = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
    const grandTotal = itemsTotal + shippingFee;

    return (
        <div className="admin-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="admin-modal" style={{ maxWidth: 620 }}>
                <div className="admin-modal-header">
                    <span className="admin-modal-title">Chi tiết đơn hàng — {order.id}</span>
                    <button className="admin-modal-close" onClick={onClose}>✕</button>
                </div>
                <div className="admin-modal-body">
                    {/* Customer Info */}
                    <div style={{ marginBottom: '1.25rem' }}>
                        <div style={{ fontWeight: 600, color: '#333', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                            Thông tin khách hàng
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.85rem', color: '#555' }}>
                            <div><strong>Họ tên:</strong> {order.customer}</div>
                            <div><strong>Email:</strong> {order.email}</div>
                            <div><strong>Điện thoại:</strong> {order.phone || 'Chưa cung cấp'}</div>
                            <div><strong>Ngày đặt:</strong> {order.date || order.createdAt}</div>
                            <div style={{ gridColumn: '1 / -1' }}><strong>Địa chỉ:</strong> {order.address || 'Chưa cung cấp'}</div>
                        </div>
                    </div>

                    {/* Order Info */}
                    <div style={{ marginBottom: '1.25rem' }}>
                        <div style={{ fontWeight: 600, color: '#333', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                            Thông tin giao hàng &amp; thanh toán
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.85rem', color: '#555' }}>
                            <div><strong>Vận chuyển:</strong> {getShippingLabel(order.shippingMethod)}</div>
                            <div><strong>Thanh toán:</strong> {getPaymentLabel(order.paymentMethod)}</div>
                        </div>
                    </div>

                    {/* Items */}
                    <div>
                        <div style={{ fontWeight: 600, color: '#333', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                            Sản phẩm ({items.length})
                        </div>
                        {items.length === 0 ? (
                            <div style={{ color: '#888', fontStyle: 'italic', fontSize: '0.85rem' }}>Chưa có thông tin sản phẩm</div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {items.map((item, i) => (
                                    <div key={i} style={{
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                        padding: '0.75rem', background: '#fafafa', borderRadius: 6,
                                        border: '1px solid #f0f0f0', fontSize: '0.85rem',
                                    }}>
                                        <div>
                                            <div style={{ fontWeight: 600, color: '#333' }}>{item.name}</div>
                                            <div style={{ color: '#888', marginTop: '0.15rem' }}>
                                                Size: {item.size} · Màu: {item.color} · SL: {item.quantity || 1}
                                            </div>
                                        </div>
                                        <div style={{ fontWeight: 600, color: '#333' }}>{formatCurrency(item.price)}</div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Subtotal + Shipping + Grand Total */}
                        <div style={{ marginTop: '0.75rem', borderTop: '1px solid #e0e0e0', paddingTop: '0.75rem' }}>
                            <div style={{
                                display: 'flex', justifyContent: 'space-between',
                                fontSize: '0.85rem', color: '#666', marginBottom: '0.4rem',
                            }}>
                                <span>Tạm tính ({items.length} sản phẩm)</span>
                                <span>{formatCurrency(itemsTotal)}</span>
                            </div>
                            <div style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                fontSize: '0.85rem', color: '#666', marginBottom: '0.6rem',
                            }}>
                                <span>
                                    Phí vận chuyển
                                    <span style={{
                                        marginLeft: '0.4rem', fontSize: '0.72rem',
                                        background: '#f0f0f0', borderRadius: 4,
                                        padding: '0.1rem 0.4rem', color: '#888',
                                    }}>
                                        {getShippingLabel(order.shippingMethod)}
                                    </span>
                                </span>
                                <span style={{ color: '#555' }}>{formatCurrency(shippingFee)}</span>
                            </div>
                            <div style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                padding: '0.75rem', background: '#f8f8f8', borderRadius: 8,
                                border: '1.5px solid #e0e0e0',
                                fontWeight: 700, fontSize: '1.05rem', color: '#333',
                            }}>
                                <span>Tổng thanh toán</span>
                                <span style={{ color: '#333', fontSize: '1.1rem' }}>{formatCurrency(grandTotal)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="admin-modal-footer">
                    <button className="admin-btn admin-btn-secondary" onClick={onClose}>Đóng</button>
                </div>
            </div>
        </div>
    );
};

// ─── Main Table ───────────────────────────────────────────────────────────────
const OrdersTable = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [viewOrder, setViewOrder] = useState(null);
    const [sendOrder, setSendOrder] = useState(null);
    const [toast, setToast] = useState(null);

    // Fetch data khi trang vừa render
    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const data = await orderService.getOrders();
            const list = data.content || data || [];

            // Map backend fields → frontend fields
            const mapped = list.map(o => ({
                ...o,
                customer: o.user?.name || o.user?.email || 'N/A',
                email: o.user?.email || '',
                phone: o.user?.phone || o.phone || '',
                total: o.totalAmount,
                date: o.orderDate
                    ? new Date(o.orderDate).toLocaleDateString('vi-VN')
                    : '',
                items: (o.items || []).map(item => ({
                    ...item,
                    name: item.productName,
                    size: item.size || 'N/A',
                    color: item.color || 'N/A',
                })),
            }));

            setOrders(mapped);
        } catch (error) {
            console.error("Lỗi lấy danh sách đơn hàng:", error);
            showToast("Không thể tải danh sách đơn hàng", "error");
        } finally {
            setLoading(false);
        }
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 4000);
    };

    const filtered = (orders || []).filter((o) => {
        const matchStatus = statusFilter === 'all' || o.status === statusFilter;
        const matchSearch =
            (o.id && o.id.toString().toLowerCase().includes(search.toLowerCase())) ||
            (o.customer && o.customer.toLowerCase().includes(search.toLowerCase())) ||
            (o.email && o.email.toLowerCase().includes(search.toLowerCase()));
        return matchStatus && matchSearch;
    });

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await orderService.updateOrderStatus(orderId, newStatus);
            setOrders((prev) =>
                prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
            );
            showToast("Cập nhật trạng thái thành công");
        } catch (error) {
            console.error(error);
            showToast("Cập nhật trạng thái thất bại", "error");
        }
    };

    if (loading) {
        return <div style={{ padding: '3rem', textAlign: 'center', color: '#666' }}>⏳ Đang tải danh sách đơn hàng...</div>;
    }

    return (
        <div>
            {/* Toolbar */}
            <div className="admin-toolbar">
                <div className="admin-search">
                    <span className="admin-search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Tìm theo mã đơn, khách hàng, email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="admin-filter-tabs" style={{ flexWrap: 'wrap' }}>
                    {STATUS_FILTERS.map((f) => (
                        <button
                            key={f.key}
                            className={`admin-filter-tab ${statusFilter === f.key ? 'active' : ''}`}
                            onClick={() => setStatusFilter(f.key)}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="admin-card">
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Mã đơn</th>
                                <th>Khách hàng</th>
                                <th>Ngày đặt</th>
                                <th>Sản phẩm</th>
                                <th>Tổng tiền</th>
                                <th>Vận chuyển</th>
                                <th>Trạng thái</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={8}>
                                        <div className="admin-empty">
                                            <div className="admin-empty-icon">💭</div>
                                            <h3>Không có đơn hàng nào</h3>
                                            <p>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((order) => {
                                    const items = order.items || [];
                                    const firstItemName = items.length > 0 ? items[0].name : 'N/A';
                                    return (
                                        <tr
                                            key={order.id}
                                            onClick={() => setViewOrder(order)}
                                            style={{ cursor: 'pointer' }}
                                            className="admin-table-row-clickable"
                                        >
                                            <td>
                                                <span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#333', fontSize: '0.82rem' }}>
                                                    {order.id}
                                                </span>
                                            </td>
                                            <td>
                                                <div style={{ fontWeight: 500, color: '#333' }}>{order.customer}</div>
                                                <div className="admin-table-sub" style={{ color: '#2563eb' }}>{order.email}</div>
                                                <div className="admin-table-sub">{order.phone}</div>
                                            </td>
                                            <td style={{ color: '#666', fontSize: '0.82rem' }}>{order.date || order.createdAt}</td>
                                            <td>
                                                <div style={{ fontSize: '0.82rem', color: '#555' }}>
                                                    {items.length} sản phẩm
                                                </div>
                                                <div className="admin-table-sub" style={{ maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                    {firstItemName}
                                                </div>
                                            </td>
                                            <td style={{ fontWeight: 600, color: '#333' }}>
                                                {formatCurrency(order.total)}
                                            </td>
                                            <td style={{ fontSize: '0.82rem', color: '#555' }}>
                                                {getShippingLabel(order.shippingMethod)}
                                            </td>
                                            <td onClick={(e) => e.stopPropagation()}>
                                                <select
                                                    className="status-select"
                                                    value={order.status}
                                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                >
                                                    {STATUS_OPTIONS.map((s) => (
                                                        <option key={s} value={s}>{getStatusLabel(s)}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td onClick={(e) => e.stopPropagation()}>
                                                <div className="table-actions">
                                                    <button
                                                        className="admin-btn-icon"
                                                        title="Gửi mail / Tặng voucher"
                                                        onClick={() => setSendOrder(order)}
                                                    >
                                                        <i className="fa-solid fa-envelope">Xác nhận email</i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="admin-pagination">
                    <span className="admin-pagination-info">
                        Hiển thị {filtered.length} / {orders.length} đơn hàng
                    </span>
                </div>
            </div>

            {/* Modals */}
            {viewOrder && (
                <OrderDetailModal order={viewOrder} onClose={() => setViewOrder(null)} />
            )}
            {sendOrder && (
                <SendMailModal
                    order={sendOrder}
                    onClose={() => setSendOrder(null)}
                    onSent={(msg) => showToast(msg, 'success')}
                />
            )}

            {/* Toast */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
};

export default OrdersTable;