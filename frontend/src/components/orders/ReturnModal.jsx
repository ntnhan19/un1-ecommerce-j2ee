import React, { useState } from 'react';
import '../../styles/components/OrderManagement.css';

const ReturnModal = ({ order, onClose, onSubmit }) => {
    const [reason, setReason] = useState('');
    const [description, setDescription] = useState('');
    const [action, setAction] = useState('refund'); // refund or exchange
    const [selectedItems, setSelectedItems] = useState([]);

    const handleToggleItem = (itemId) => {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter(id => id !== itemId));
        } else {
            setSelectedItems([...selectedItems, itemId]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedItems.length === 0) {
            alert("Vui lòng chọn ít nhất 1 sản phẩm để đổi/trả");
            return;
        }
        if (!reason) {
            alert("Vui lòng chọn lý do");
            return;
        }

        // Mock submit
        onSubmit({ items: selectedItems, reason, description, action });
    };

    return (
        <div className="return-modal-overlay">
            <div className="return-modal-content">
                <div className="return-modal-header">
                    <h2>Yêu cầu Đổi / Trả hàng</h2>
                    <button className="btn-close-modal" onClick={onClose}>&times;</button>
                </div>

                <form onSubmit={handleSubmit} className="return-modal-body">
                    <p className="return-subtitle">Mã đơn hàng: <strong>{order.orderNumber}</strong></p>

                    <div className="form-section">
                        <h3>1. Chọn sản phẩm cần đổi/trả</h3>
                        <div className="return-items-list">
                            {order.items.map(item => (
                                <div key={item.id} className="return-item-row" onClick={() => handleToggleItem(item.id)}>
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(item.id)}
                                        readOnly
                                    />
                                    <img src={item.image} alt={item.name} className="return-item-img" />
                                    <div className="return-item-info">
                                        <p className="return-item-name">{item.name}</p>
                                        <p className="return-item-variant">Size: {item.size || 'N/A'} | Màu: {item.color || 'N/A'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="form-section">
                        <h3>2. Chọn hình thức xử lý</h3>
                        <div className="action-options">
                            <label className={`action-option ${action === 'refund' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="action"
                                    value="refund"
                                    checked={action === 'refund'}
                                    onChange={(e) => setAction(e.target.value)}
                                />
                                Hoàn tiền
                            </label>
                            <label className={`action-option ${action === 'exchange' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="action"
                                    value="exchange"
                                    checked={action === 'exchange'}
                                    onChange={(e) => setAction(e.target.value)}
                                />
                                Đổi sản phẩm / Đổi size
                            </label>
                        </div>
                    </div>

                    <div className="form-section">
                        <h3>3. Lý do & Chi tiết</h3>
                        <select
                            className="return-select"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            required
                        >
                            <option value="">-- Chọn lý do --</option>
                            <option value="wrong_item">Giao sai sản phẩm</option>
                            <option value="defective">Sản phẩm bị lỗi / Hư hỏng</option>
                            <option value="not_match">Không giống với mô tả</option>
                            <option value="wrong_size">Không vừa size</option>
                            <option value="other">Lý do khác</option>
                        </select>

                        <textarea
                            className="return-textarea"
                            placeholder="Mô tả chi tiết tình trạng lỗi (bắt buộc đối với sản phẩm lỗi)..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                        ></textarea>

                        <div className="upload-images-area">
                            <div className="upload-placeholder">
                                <span>+ Tải ảnh/video lên</span>
                                <small>(Tối đa 3 ảnh/video)</small>
                            </div>
                        </div>
                    </div>

                    <div className="return-modal-footer">
                        <button type="button" className="btn-cancel" onClick={onClose}>Hủy</button>
                        <button type="submit" className="btn-submit-return">Gửi yêu cầu</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReturnModal;
