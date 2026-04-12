import React, { useState, useEffect, useCallback } from 'react';
import categoryService from '../../services/categoryService';
import '../../styles/components/Admin.css';

const Toast = ({ message, type, onClose }) => (
    <div style={{
        position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999,
        background: type === 'success' ? '#16a34a' : '#dc2626',
        color: '#fff', padding: '0.85rem 1.25rem', borderRadius: 8,
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        display: 'flex', alignItems: 'center', gap: '0.65rem',
        fontSize: '0.85rem', fontWeight: 500, maxWidth: 360,
    }}>
        <span>{type === 'success' ? '✓' : '!'}</span>
        <span style={{ flex: 1 }}>{message}</span>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1rem' }}>×</button>
    </div>
);

const CategoryModal = ({ category, onClose, onSave }) => {
    const [form, setForm] = useState({
        name: category?.name || '',
        description: category?.description || '',
    });
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await onSave({ ...form, id: category?.id });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="admin-modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
            <div className="admin-modal" style={{ maxWidth: 480 }} onClick={e => e.stopPropagation()}>
                <div className="admin-modal-header">
                    <h3 className="admin-modal-title">
                        {category ? 'CẬP NHẬT DANH MỤC' : 'TẠO DANH MỤC MỚI'}
                    </h3>
                    <button className="admin-btn-icon" onClick={onClose}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="1" y1="1" x2="13" y2="13" /><line x1="13" y1="1" x2="1" y2="13" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div className="admin-form-group">
                            <label className="admin-form-label">TÊN DANH MỤC <span style={{ color: '#ef4444' }}>*</span></label>
                            <input
                                className="admin-input"
                                type="text"
                                value={form.name}
                                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                placeholder="VD: Áo Thun, Quần Jeans, Áo Khoác..."
                                required
                                style={{ width: '100%' }}
                            />
                            <div style={{ fontSize: '0.72rem', color: '#aaa', marginTop: '0.3rem' }}>
                                Danh mục dùng để phân loại sản phẩm theo loại quần áo cụ thể
                            </div>
                        </div>

                        <div className="admin-form-group">
                            <label className="admin-form-label">MÔ TẢ</label>
                            <textarea
                                className="admin-input"
                                value={form.description}
                                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                                placeholder="Mô tả ngắn về danh mục này..."
                                rows={3}
                                style={{ width: '100%', resize: 'vertical' }}
                            />
                        </div>
                    </div>

                    <div className="admin-modal-footer">
                        <button type="button" className="admin-btn admin-btn-secondary" onClick={onClose}>
                            Hủy bỏ
                        </button>
                        <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                            {saving ? 'Đang lưu...' : (category ? 'Lưu thay đổi' : 'Tạo danh mục')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const DeleteConfirmModal = ({ category, onConfirm, onCancel }) => (
    <div className="admin-modal-overlay" onClick={onCancel}>
        <div className="admin-modal" style={{ maxWidth: 380 }} onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
                <span className="admin-modal-title" style={{ color: '#dc2626' }}>Xóa danh mục</span>
                <button className="admin-btn-icon" onClick={onCancel}>×</button>
            </div>
            <div style={{ padding: '1.25rem 1.5rem' }}>
                <p style={{ margin: 0, color: '#444', lineHeight: 1.6, fontSize: '0.88rem' }}>
                    Bạn có chắc muốn xóa danh mục <strong style={{ color: '#111' }}>{category.name}</strong>?
                    <br />
                    <span style={{ color: '#d97706', fontSize: '0.82rem' }}>
                        Lưu ý: các sản phẩm thuộc danh mục này sẽ không còn danh mục.
                    </span>
                </p>
            </div>
            <div className="admin-modal-footer">
                <button className="admin-btn admin-btn-secondary" onClick={onCancel}>Hủy</button>
                <button className="admin-btn admin-btn-danger" onClick={onConfirm}>Xóa danh mục</button>
            </div>
        </div>
    </div>
);

const CategoriesTable = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editCategory, setEditCategory] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [toast, setToast] = useState(null);

    const showToast = useCallback((message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    }, []);

    const fetchCategories = useCallback(async () => {
        setLoading(true);
        try {
            const data = await categoryService.getAllCategories();
            setCategories(data || []);
        } catch (err) {
            console.error('Error fetching categories:', err);
            showToast('Không thể tải danh mục', 'error');
        } finally {
            setLoading(false);
        }
    }, [showToast]);

    useEffect(() => { fetchCategories(); }, [fetchCategories]);

    const filtered = categories.filter(c =>
        c.name?.toLowerCase().includes(search.toLowerCase()) ||
        c.description?.toLowerCase().includes(search.toLowerCase())
    );

    const handleOpenAdd = () => { setEditCategory(null); setModalOpen(true); };
    const handleOpenEdit = (cat) => { setEditCategory(cat); setModalOpen(true); };

    const handleSave = async (formData) => {
        try {
            if (formData.id) {
                // Update: build Category object with id so JPA knows it's an update
                const updated = await categoryService.saveCategory(formData);
                setCategories(prev => prev.map(c => c.id === formData.id ? updated : c));
                showToast('Đã cập nhật danh mục!');
            } else {
                const created = await categoryService.saveCategory(formData);
                setCategories(prev => [...prev, created]);
                showToast('Đã tạo danh mục mới!');
            }
            setModalOpen(false);
        } catch (err) {
            console.error('Error saving category:', err);
            showToast('Lưu thất bại: ' + (err.message || 'Lỗi hệ thống'), 'error');
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        try {
            await categoryService.deleteCategory(deleteTarget.id);
            setCategories(prev => prev.filter(c => c.id !== deleteTarget.id));
            showToast('Đã xóa danh mục!');
        } catch (err) {
            showToast('Xóa thất bại: ' + (err.message || 'Lỗi hệ thống'), 'error');
        } finally {
            setDeleteTarget(null);
        }
    };

    if (loading) return <div className="admin-loading">Đang tải danh mục...</div>;

    return (
        <div>
            {/* Toolbar */}
            <div className="admin-toolbar">
                <div className="admin-search">
                    <svg className="admin-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Tìm kiếm danh mục..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={handleOpenAdd}>
                    + THÊM DANH MỤC
                </button>
            </div>

            {/* Info Banner */}
            <div style={{
                background: '#fffbeb', border: '1px solid #fde68a',
                borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '1rem',
                fontSize: '0.8rem', color: '#92400e', display: 'flex', gap: '0.5rem', alignItems: 'flex-start',
            }}>
                <span>ℹ</span>
                <span>
                    Danh mục là các loại sản phẩm cụ thể như <strong>Áo Thun</strong>, <strong>Quần Jeans</strong>, <strong>Áo Khoác</strong>...
                    Loại sản phẩm (TOP/BOTTOM/...) và giới tính được cài đặt riêng trong từng sản phẩm.
                </span>
            </div>

            {/* Table */}
            <div className="admin-card">
                <div className="admin-card-header">
                    <h3 className="admin-card-title">DANH SÁCH DANH MỤC</h3>
                    <span className="admin-card-sub">{filtered.length} danh mục</span>
                </div>

                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>DANH MỤC</th>
                                <th>MÔ TẢ</th>
                                <th>SỐ SP</th>
                                <th style={{ textAlign: 'right' }}>THAO TÁC</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={4}>
                                        <div className="admin-empty">
                                            <div className="admin-empty-icon">🗂</div>
                                            <h3>Chưa có danh mục nào</h3>
                                            <p>Bấm "+ THÊM DANH MỤC" để tạo danh mục đầu tiên</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filtered.map(cat => (
                                    <tr key={cat.id}>
                                        <td>
                                            <div className="admin-table-product-name">{cat.name}</div>
                                            <div className="admin-table-sub">ID #{cat.id}</div>
                                        </td>
                                        <td>
                                            <div style={{ maxWidth: 360, fontSize: '0.82rem', color: '#666', lineHeight: 1.5 }}>
                                                {cat.description || <em style={{ color: '#ccc' }}>Chưa có mô tả</em>}
                                            </div>
                                        </td>
                                        <td>
                                            <span style={{ fontWeight: 700, color: '#333', fontSize: '0.88rem' }}>
                                                {cat.productCount ?? 0}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="table-actions" style={{ justifyContent: 'flex-end' }}>
                                                <button className="admin-btn-icon" title="Chỉnh sửa" onClick={() => handleOpenEdit(cat)}>
                                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                    </svg>
                                                </button>
                                                <button className="admin-btn-icon danger" title="Xóa" onClick={() => setDeleteTarget(cat)}>
                                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <polyline points="3 6 5 6 21 6" />
                                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="admin-pagination">
                    <span className="admin-pagination-info">{filtered.length} / {categories.length} danh mục</span>
                </div>
            </div>

            {/* Modals */}
            {modalOpen && (
                <CategoryModal
                    category={editCategory}
                    onClose={() => setModalOpen(false)}
                    onSave={handleSave}
                />
            )}
            {deleteTarget && (
                <DeleteConfirmModal
                    category={deleteTarget}
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteTarget(null)}
                />
            )}
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </div>
    );
};

export default CategoriesTable;