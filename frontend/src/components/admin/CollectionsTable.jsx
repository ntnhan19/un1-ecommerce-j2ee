import React, { useState, useEffect } from 'react';
import collectionService from '../../services/collectionService';
import '../../styles/components/Admin.css';

const CollectionsTable = () => {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingCollection, setEditingCollection] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        coverUrl: '',
        galleryUrls: '',
        active: true
    });

    useEffect(() => {
        fetchCollections();
    }, []);

    const fetchCollections = async () => {
        try {
            const data = await collectionService.getCollections();
            setCollections(data);
        } catch (err) {
            console.error("Error fetching collections:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (collection = null) => {
        if (collection) {
            setEditingCollection(collection);
            setFormData({
                name: collection.name,
                description: collection.description || '',
                coverUrl: collection.coverUrl || '',
                galleryUrls: collection.galleryUrls ? collection.galleryUrls.join(', ') : '',
                active: collection.active
            });
        } else {
            setEditingCollection(null);
            setFormData({
                name: '',
                description: '',
                coverUrl: '',
                galleryUrls: '',
                active: true
            });
        }
        setShowModal(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            galleryUrls: formData.galleryUrls.split(',').map(url => url.trim()).filter(url => url !== '')
        };

        try {
            if (editingCollection) {
                await collectionService.updateCollection(editingCollection.id, payload);
            } else {
                await collectionService.createCollection(payload);
            }
            setShowModal(false);
            fetchCollections();
        } catch (err) {
            console.error("Error saving collection:", err);
            alert("Có lỗi xảy ra khi lưu!");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa bộ sưu tập này?")) {
            try {
                await collectionService.deleteCollection(id);
                fetchCollections();
            } catch (err) {
                console.error("Error deleting collection:", err);
            }
        }
    };

    if (loading) return <div className="admin-loading">Đang tải dữ liệu...</div>;

    return (
        <div className="admin-card">
            <div className="admin-card-header">
                <h3 className="admin-card-title">DANH SÁCH BỘ SƯU TẬP</h3>
                <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => handleOpenModal()}>
                    + THÊM BỘ SƯU TẬP MỚI
                </button>
            </div>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ẢNH BÌA</th>
                            <th>TÊN BỘ SƯU TẬP</th>
                            <th>MÔ TẢ</th>
                            <th>TRẠNG THÁI</th>
                            <th style={{ textAlign: 'right' }}>THAO TÁC</th>
                        </tr>
                    </thead>
                    <tbody>
                        {collections.map(col => (
                            <tr key={col.id}>
                                <td>
                                    <img src={col.coverUrl} alt={col.name} className="admin-table-img" style={{ width: '60px', height: '80px', borderRadius: '4px' }} />
                                </td>
                                <td>
                                    <div className="admin-table-product-name">{col.name}</div>
                                    <div className="admin-table-sub">ID: #{col.id}</div>
                                </td>
                                <td>
                                    <div style={{ maxWidth: '300px', fontSize: '0.8rem', color: '#666', lineHeight: '1.4' }}>
                                        {col.description || 'Không có mô tả'}
                                    </div>
                                </td>
                                <td>
                                    <span className={`status-badge ${col.active ? 'active' : 'cancelled'}`}>
                                        {col.active ? 'ĐANG HIỆN' : 'ĐANG ẨN'}
                                    </span>
                                </td>
                                <td>
                                    <div className="table-actions" style={{ justifyContent: 'flex-end' }}>
                                        <button className="admin-btn-icon" title="Chỉnh sửa" onClick={() => handleOpenModal(col)}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                        </button>
                                        <button className="admin-btn-icon danger" title="Xóa" onClick={() => handleDelete(col.id)}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '650px' }}>
                        <div className="admin-modal-header">
                            <h3 className="admin-modal-title">
                                {editingCollection ? 'CẬP NHẬT BỘ SƯU TẬP' : 'TẠO BỘ SƯU TẬP MỚI'}
                            </h3>
                            <button className="admin-btn-icon" onClick={() => setShowModal(false)}>&times;</button>
                        </div>
                        
                        <form onSubmit={handleSave} style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                <div className="admin-form-group">
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', marginBottom: '0.5rem', color: '#888' }}>TÊN BỘ SƯU TẬP</label>
                                    <input 
                                        type="text" 
                                        className="admin-input"
                                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #e0e0e0', borderRadius: '6px' }}
                                        value={formData.name} required
                                        onChange={e => setFormData({...formData, name: e.target.value})} 
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', marginBottom: '0.5rem', color: '#888' }}>TRẠNG THÁI</label>
                                    <select 
                                        className="status-select"
                                        style={{ width: '100%', padding: '0.75rem' }}
                                        value={formData.active}
                                        onChange={e => setFormData({...formData, active: e.target.value === 'true'})}
                                    >
                                        <option value="true">Hiển thị trên Home</option>
                                        <option value="false">Ẩn khỏi Home</option>
                                    </select>
                                </div>
                            </div>

                            <div className="admin-form-group" style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', marginBottom: '0.5rem', color: '#888' }}>MÔ TẢ NGẮN (MARKETING TEXT)</label>
                                <textarea 
                                    className="admin-input"
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #e0e0e0', borderRadius: '6px', minHeight: '80px' }}
                                    value={formData.description}
                                    onChange={e => setFormData({...formData, description: e.target.value})} 
                                />
                            </div>

                            <div className="admin-form-group" style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', marginBottom: '0.5rem', color: '#888' }}>URL ẢNH BÌA (COVER BANNER)</label>
                                <input 
                                    type="text" 
                                    className="admin-input"
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #e0e0e0', borderRadius: '6px' }}
                                    value={formData.coverUrl} required
                                    onChange={e => setFormData({...formData, coverUrl: e.target.value})} 
                                />
                            </div>

                            <div className="admin-form-group" style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', marginBottom: '0.5rem', color: '#888' }}>ALBUM GALLERY (URL CÁCH NHAU BẰNG DẤU PHẨY)</label>
                                <textarea 
                                    className="admin-input"
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #e0e0e0', borderRadius: '6px', minHeight: '120px', fontSize: '0.8rem' }}
                                    value={formData.galleryUrls}
                                    placeholder="https://image1.jpg, https://image2.jpg..."
                                    onChange={e => setFormData({...formData, galleryUrls: e.target.value})} 
                                />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #f0f0f0' }}>
                                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setShowModal(false)}>HỦY BỎ</button>
                                <button type="submit" className="admin-btn admin-btn-primary">LƯU BỘ SƯU TẬP</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CollectionsTable;
