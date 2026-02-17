import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { useOrder } from '../hooks/useOrder';
import Header from '../components/common/Header';
import PersonalInfo from '../components/profile/PersonalInfo';
import SavedAddresses from '../components/profile/SavedAddresses';
import OrderHistory from '../components/profile/OrderHistory';
import MyVouchers from '../components/profile/MyVouchers';
import ChangePassword from '../components/profile/ChangePassword';
import '../styles/components/Profile.css';

const Profile = () => {
    const { user, logout } = useUser();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('personal');

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!user) {
            navigate('/auth-login');
        }
    }, [user, navigate]);

    // Don't render if no user
    if (!user) {
        return null;
    }

    const tabs = [
        { id: 'personal', label: 'Thông tin cá nhân', icon: '' },
        { id: 'addresses', label: 'Địa chỉ đã lưu', icon: '' },
        { id: 'orders', label: 'Lịch sử đơn hàng', icon: '' },
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
                        <span>{user.firstName?.charAt(0)}{user.lastName?.charAt(0)}</span>
                    </div>
                    <div className="profile-info">
                        <h1>{user.firstName} {user.lastName}</h1>
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
                    {activeTab === 'vouchers' && <MyVouchers />}
                    {activeTab === 'password' && <ChangePassword />}
                </div>
            </div>
        </div>
    );
};

export default Profile;

