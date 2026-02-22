import React, { useState } from 'react';
import '../../styles/components/ProductReviews.css';

// Mock reviews data (could be moved to a separate mock file later)
const MOCK_REVIEWS = [
    {
        id: 1,
        user: 'Nguyễn Văn A',
        avatar: 'N',
        rating: 5,
        date: '2023-10-15',
        comment: 'Sản phẩm rất đẹp, chất vải tốt giống như mô tả. Giao hàng nhanh. Đóng gói cẩn thận. Mình sẽ ủng hộ shop tiếp vào lần sau.',
        images: [
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1618354691438-25af0476c223?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        ]
    },
    {
        id: 2,
        user: 'Trần Thị B',
        avatar: 'T',
        rating: 4,
        date: '2023-10-12',
        comment: 'Áo mặc vừa vặn, tuy nhiên màu bên ngoài hơi tối hơn trong ảnh một chút. Chất vải thoáng mát.',
        images: [
            'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        ]
    },
    {
        id: 3,
        user: 'Lê Văn C',
        avatar: 'L',
        rating: 5,
        date: '2023-10-10',
        comment: 'Tuyệt vời! AI chọn size rất chuẩn, mình không ngờ mua áo online mà mặc vừa khít như may đo. Đỉnh của chóp.',
        images: []
    }
];

const ProductReviews = ({ productId }) => {
    const [reviews, setReviews] = useState(MOCK_REVIEWS);
    const [newReview, setNewReview] = useState({ rating: 5, comment: '', name: '' });
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newReview.comment.trim() || !newReview.name.trim()) return;

        const review = {
            id: Date.now(),
            user: newReview.name,
            avatar: newReview.name.charAt(0).toUpperCase(),
            rating: newReview.rating,
            date: new Date().toISOString().split('T')[0],
            comment: newReview.comment,
            verified: false,
            images: []
        };

        setReviews([review, ...reviews]);
        setNewReview({ rating: 5, comment: '', name: '' });
        setShowForm(false);
    };

    const StarIcon = ({ filled, onClick, className }) => (
        <svg
            onClick={onClick}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={filled ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`star-icon ${filled ? 'filled' : 'empty'} ${className || ''}`}
        >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
    );

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <StarIcon key={index} filled={index < rating} />
        ));
    };

    const averageRating = reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length) : 0;

    // Calculate rating distribution
    const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(r => {
        if (ratingDistribution[r.rating] !== undefined) {
            ratingDistribution[r.rating]++;
        }
    });

    return (
        <div className="product-reviews-section">
            <h3 className="section-heading">Đánh giá sản phẩm ({reviews.length})</h3>

            <div className="reviews-summary">
                <div className="average-rating">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                        <span className="rating-number">
                            {averageRating.toFixed(1)}
                        </span>
                        <span style={{ fontSize: '0.9rem', color: '#666', fontWeight: 600 }}>/ 5</span>
                    </div>
                    <div className="rating-stars">
                        {renderStars(Math.round(averageRating))}
                    </div>
                </div>

                <div className="rating-distribution">
                    {[5, 4, 3, 2, 1].map(stars => {
                        const count = ratingDistribution[stars];
                        const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                        return (
                            <div key={stars} className="dist-row">
                                <span>{stars} <span style={{ color: '#fbbf24' }}>★</span></span>
                                <div className="dist-bar-container">
                                    <div className="dist-bar-fill" style={{ width: `${percentage}%` }}></div>
                                </div>
                                <span style={{ width: '20px', textAlign: 'right' }}>{count}</span>
                            </div>
                        );
                    })}
                </div>

                <div className="summary-actions">
                    <button
                        className="btn-write-review"
                        onClick={() => setShowForm(!showForm)}
                    >
                        {showForm ? 'Đóng biểu mẫu' : 'Viết đánh giá'}
                    </button>
                </div>
            </div>

            {showForm && (
                <form className="review-form" onSubmit={handleSubmit}>
                    <h4>Viết đánh giá của bạn</h4>
                    <div className="form-group">
                        <label>Tên hiển thị</label>
                        <input
                            type="text"
                            value={newReview.name}
                            onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                            placeholder="Nhập tên của bạn"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Đánh giá</label>
                        <div className="star-rating-input">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <StarIcon
                                    key={star}
                                    filled={star <= newReview.rating}
                                    onClick={() => setNewReview({ ...newReview, rating: star })}
                                    className="star-input-icon"
                                />
                            ))}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Nhận xét</label>
                        <textarea
                            value={newReview.comment}
                            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                            placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
                            required
                            rows={4}
                        />
                    </div>
                    <button type="submit" className="btn-submit-review">Gửi đánh giá</button>
                </form>
            )}

            <div className="reviews-list">
                {reviews.map((review) => (
                    <div key={review.id} className="review-item">
                        <div className="review-avatar">{review.avatar}</div>
                        <div className="review-content">
                            <div className="review-header">
                                <span className="review-user">{review.user}</span>
                                <span className="review-date">{review.date}</span>
                            </div>
                            <div className="review-rating">
                                {renderStars(review.rating)}
                                {review.verified !== false && (
                                    <span className="verified-badge">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="verified-icon"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                        Đã mua hàng
                                    </span>
                                )}
                            </div>
                            <p className="review-text">{review.comment}</p>

                            {/* Images Grid */}
                            {review.images && review.images.length > 0 && (
                                <div className="review-images-grid">
                                    {review.images.map((img, idx) => (
                                        <img key={idx} src={img} alt={`Feedback ${idx}`} className="review-image-item" />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductReviews;
