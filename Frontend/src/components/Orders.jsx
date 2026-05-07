import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Orders.css';

const Orders = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('active');

    const handleNewOrder = () => {
        // TODO: Navigate to new order creation page
        alert('ניתוב לעמוד יצירת הזמנה חדשה');
    };

    return (
        <div className="orders-container">
            <header className="orders-header">
                <button className="orders-back-button" onClick={() => navigate('/')}>
                    ← חזרה
                </button>
                <h1>ניהול הזמנות</h1>
            </header>

            <div className="orders-actions">
                <button className="orders-new-button" onClick={handleNewOrder}>
                    + הזמנה חדשה
                </button>
            </div>

            <div className="orders-tabs">
                <button
                    className={`orders-tab ${activeTab === 'active' ? 'orders-tab--active' : ''}`}
                    onClick={() => setActiveTab('active')}
                >
                    הזמנות פעילות
                </button>
                <button
                    className={`orders-tab ${activeTab === 'future' ? 'orders-tab--active' : ''}`}
                    onClick={() => setActiveTab('future')}
                >
                    הזמנות עתידיות
                </button>
                <button
                    className={`orders-tab ${activeTab === 'history' ? 'orders-tab--active' : ''}`}
                    onClick={() => setActiveTab('history')}
                >
                    היסטוריית הזמנות
                </button>
            </div>

            <div className="orders-content">
                {activeTab === 'active' && (
                    <div className="orders-section">
                        <p>אין הזמנות פעילות כרגע</p>
                    </div>
                )}
                {activeTab === 'future' && (
                    <div className="orders-section">
                        <p>אין הזמנות עתידיות כרגע</p>
                    </div>
                )}
                {activeTab === 'history' && (
                    <div className="orders-section">
                        <p>אין היסטוריית הזמנות</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
