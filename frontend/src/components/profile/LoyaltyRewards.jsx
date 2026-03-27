import React from 'react';

const LoyaltyRewards = () => {
    // Mock data
    const points = 1250;
    const tier = 'Vàng';
    const nextTierPoints = 2000;
    const progress = (points / nextTierPoints) * 100;

    const availableCoupons = [
        { id: 1, title: 'Giảm 50K cho đơn từ 200K', cost: 500, type: 'discount' },
        { id: 2, title: 'Miễn phí vận chuyển toàn quốc', cost: 800, type: 'shipping' },
        { id: 3, title: 'Giảm 15% tổng hoá đơn', cost: 1500, type: 'percent' },
    ];

    return (
        <div className="loyalty-rewards-container">
            <h2 className="profile-section-title">Khách hàng thân thiết</h2>

            <div style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FDB931 100%)', borderRadius: '12px', padding: '2rem', color: '#fff', marginBottom: '2rem', boxShadow: '0 4px 15px rgba(253, 185, 49, 0.3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div>
                        <p style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 500, color: '#855A00' }}>Hạng Thành Viên</p>
                        <h3 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 800, color: '#fff', textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>{tier}</h3>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 500, color: '#855A00' }}>Điểm Tích Luỹ</p>
                        <h3 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 800, color: '#fff', textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>{points} <span style={{ fontSize: '1.2rem' }}>UN1</span></h3>
                    </div>
                </div>

                <div className="progress-bar-container" style={{ background: 'rgba(255,255,255,0.3)', height: '10px', borderRadius: '5px', overflow: 'hidden', marginBottom: '0.5rem' }}>
                    <div style={{ height: '100%', width: `${progress}%`, background: '#fff', borderRadius: '5px' }}></div>
                </div>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#855A00', textAlign: 'right' }}>
                    Cần {nextTierPoints - points} điểm nữa để lên hạng Kim Cương
                </p>
            </div>

            <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Đổi điểm nhận Ưu đãi</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    {availableCoupons.map(coupon => (
                        <div key={coupon.id} style={{ border: '1px solid #eaeaea', borderRadius: '8px', padding: '1.5rem', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: coupon.type === 'shipping' ? '#3b82f6' : '#10b981' }}></div>
                            <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', minHeight: '48px' }}>{coupon.title}</h4>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                <span style={{ fontWeight: 700, color: '#f59e0b', fontSize: '1.2rem' }}>{coupon.cost} điểm</span>
                                <button
                                    style={{
                                        padding: '0.5rem 1rem',
                                        background: points >= coupon.cost ? '#111' : '#ccc',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: points >= coupon.cost ? 'pointer' : 'not-allowed',
                                        fontWeight: 600
                                    }}
                                    disabled={points < coupon.cost}
                                >
                                    Đổi ngay
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LoyaltyRewards;
