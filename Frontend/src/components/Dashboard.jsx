import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const location = useLocation();
    const successMessage = location.state?.success;

    return (
        <div className="dashboard-container">
            <div className="dashboard-card">
                {successMessage && <div className="dashboard-success">{successMessage}</div>}
                <h1>ברוכים הבאים לאזור האישי</h1>
                <p>זהו הדף הראשי של המערכת אחרי התחברות. כאן תוכל לנהל הזמנות ולחזור למידע האישי שלך.</p>
            </div>
        </div>
    );
};

export default Dashboard;
