import React from 'react';

const MyReviews = () => {
    // Mock data for user's review history
    const reviews = [
        {
            id: 1,
            productName: 'Áo Thun Basic Cotton',
            productImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
            rating: 5,
            date: '15/10/2023',
            content: 'Chất liệu vải rất tốt, thoáng mát. Đúng với kỳ vọng của mình.',
            status: 'approved'
        },
        {
            id: 2,
            productName: 'Quần Jean Nam Ống Rộng',
            productImage: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
            rating: 4,
            date: '02/09/2023',
            content: 'Quần form đẹp nhưng phần eo hơi rộng so với size bảng đo.',
            status: 'approved'
        }
    ];

    const pendingReviews = [
        {
            id: 3,
            orderId: 'ORD-2023-889',
            productName: 'Áo Khoác Nam Thể Thao',
            productImage: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
            date: 'Giao hàng thành công 2 ngày trước'
        }
    ];

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={index < rating ? "#fbbf24" : "none"}
                stroke={index < rating ? "#fbbf24" : "#e5e7eb"}
                strokeWidth="2"
                style={{ width: '16px', height: '16px', marginRight: '2px' }}
            >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
        ));
    };

    return (
        <div className="my-reviews-container">
            <h2 className="profile-section-title">Đánh giá sản phẩm</h2>

            <div className="reviews-tabs">
                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', borderBottom: '2px solid #111', display: 'inline-block', paddingBottom: '0.5rem' }}>
                        Chờ đánh giá ({pendingReviews.length})
                    </h3>
                    <div className="pending-reviews-list">
                        {pendingReviews.map(item => (
                            <div key={item.id} className="pending-review-card" style={{ display: 'flex', gap: '1rem', padding: '1rem', border: '1px solid #eee', borderRadius: '8px', marginBottom: '1rem', alignItems: 'center' }}>
                                <img src={item.productImage} alt={item.productName} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ margin: '0 0 0.5rem 0' }}>{item.productName}</h4>
                                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>{item.date}</p>
                                </div>
                                <button style={{ backgroundColor: '#111', color: '#fff', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>
                                    Viết đánh giá
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', borderBottom: '2px solid #111', display: 'inline-block', paddingBottom: '0.5rem' }}>
                        Lịch sử đánh giá ({reviews.length})
                    </h3>
                    <div className="history-reviews-list">
                        {reviews.map(item => (
                            <div key={item.id} className="history-review-card" style={{ display: 'flex', gap: '1rem', padding: '1.5rem', border: '1px solid #eee', borderRadius: '8px', marginBottom: '1rem', backgroundColor: '#fafafa' }}>
                                <img src={item.productImage} alt={item.productName} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <h4 style={{ margin: 0 }}>{item.productName}</h4>
                                        <span style={{ fontSize: '0.85rem', color: '#888' }}>{item.date}</span>
                                    </div>
                                    <div style={{ marginBottom: '0.5rem' }}>
                                        {renderStars(item.rating)}
                                    </div>
                                    <p style={{ margin: 0, color: '#444', lineHeight: 1.5 }}>{item.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyReviews;
