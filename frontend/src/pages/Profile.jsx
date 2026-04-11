import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useOrder } from '../hooks/useOrder';
import Header from '../components/common/Header';
import PersonalInfo from '../components/profile/PersonalInfo';
import SavedAddresses from '../components/profile/SavedAddresses';
import OrderHistory from '../components/profile/OrderHistory';
import MyVouchers from '../components/profile/MyVouchers';
import ChangePassword from '../components/profile/ChangePassword';
import MyReviews from '../components/profile/MyReviews';
import LoyaltyRewards from '../components/profile/LoyaltyRewards';
import '../styles/components/Profile.css';

const Profile = () => {
    const { user, logout, loading } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('personal');

    // Show loading spinner if auth state is being determined
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
        );
    }

    // Don't render if no user (this is a fallback, PrivateRoute should handle this)
    if (!user) {
        return null;
    }

    const tabs = [
        { id: 'personal', label: 'Thông tin cá nhân', icon: '' },
        { id: 'addresses', label: 'Địa chỉ đã lưu', icon: '' },
        { id: 'orders', label: 'Lịch sử đơn hàng', icon: '' },
        { id: 'reviews', label: 'Đánh giá SP', icon: '' },
        { id: 'rewards', label: 'Thành viên', icon: '' },
        { id: 'vouchers', label: 'Voucher của tôi', icon: '' },
        { id: 'password', label: 'Đổi mật khẩu', icon: '' }
    ];

    return (
        <div className="profile-page">
            <Header />

            <div className="profile-container">
                {/* Profile Header */}
                <div className="profile-header">
                    <div className="profile-avatar">
                        <span>{user.fullName?.charAt(0)}</span>
                    </div>
                    <div className="profile-info">
                        <h1>{user.fullName}</h1>
                        <p>{user.email}</p>
                    </div>
                    <button
                        className="btn-logout"
                        onClick={() => {
                            if (window.confirm('Bạn có chắc chắn muốn đăng xuất?')) {
                                logout();
                                navigate('/');
                            }
                        }}
                    >
                        Đăng xuất
                    </button>
                </div>

                {/* Tab Navigation */}
                <div className="profile-tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <span className="tab-icon">{tab.icon}</span>
                            <span className="tab-label">{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="profile-content">
                    {activeTab === 'personal' && <PersonalInfo user={user} />}
                    {activeTab === 'addresses' && <SavedAddresses />}
                    {activeTab === 'orders' && <OrderHistory />}
                    {activeTab === 'reviews' && <MyReviews />}
                    {activeTab === 'rewards' && <LoyaltyRewards />}
                    {activeTab === 'vouchers' && <MyVouchers />}
                    {activeTab === 'password' && <ChangePassword />}
                </div>
            </div>
        </div>
    );
};

export default Profile;

