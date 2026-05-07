import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateUser } from '../api/authApi';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const successMessage = location.state?.success;
    const [user, setUser] = useState(null);
    const [editField, setEditField] = useState(null);
    const [updatedValue, setUpdatedValue] = useState('');
    const [notification, setNotification] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const fields = [
        { field: 'first_name', label: 'שם פרטי' },
        { field: 'last_name', label: 'שם משפחה' },
        { field: 'phone', label: 'טלפון' },
        { field: 'email', label: 'אימייל' },
        { field: 'city', label: 'עיר' },
        { field: 'neighborhood', label: 'שכונה' },
        { field: 'street', label: 'רחוב', fullWidth: true },
    ];

    const startEdit = (field) => {
        setEditField(field);
        setUpdatedValue(user[field] || '');
        setNotification('');
    };

    const saveField = async () => {
        if (!editField) return;
        setIsSaving(true);
        setNotification('');

        try {
            const updatedUser = { ...user, [editField]: updatedValue };
            const response = await updateUser(updatedUser);

            if (response.user) {
                setUser(response.user);
                localStorage.setItem('user', JSON.stringify(response.user));
                setEditField(null);
                setNotification(response.message || 'הפרט נשמר בהצלחה');
            } else {
                setNotification(response.error || 'שגיאה בשמירת הפרט');
            }
        } catch (error) {
            setNotification('שגיאה בשמירה, נסו שוב');
        } finally {
            setIsSaving(false);
        }
    };

    const cancelEdit = () => {
        setEditField(null);
        setNotification('');
    };

    const handleBack = () => {
        navigate('/');
    };

    if (!user) {
        return null;
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-card">
                {successMessage && <div className="dashboard-success">{successMessage}</div>}
                <div className="dashboard-header">
                    <div>
                        <h1>הפרטים האישיים שלי</h1>
                        {notification && <div className="dashboard-success">{notification}</div>}
                    </div>
                    <button className="back-button" onClick={handleBack}>חזרה לעמוד הראשי</button>
                </div>

                <div className="profile-grid">
                    {fields.map(({ field, label, fullWidth }) => (
                        <div key={field} className={`profile-item ${fullWidth ? 'full-width' : ''}`}>
                            <div className="profile-row">
                                <span className="profile-label">{label}</span>
                                {editField !== field && (
                                    <button className="edit-button" onClick={() => startEdit(field)}>
                                        ✏️ ערוך
                                    </button>
                                )}
                            </div>

                            {editField === field ? (
                                <> 
                                    <input
                                        className="profile-input"
                                        value={updatedValue}
                                        onChange={(e) => setUpdatedValue(e.target.value)}
                                    />
                                    <div className="profile-actions">
                                        <button className="save-button" onClick={saveField} disabled={isSaving}>
                                            {isSaving ? 'שומר...' : 'שמור'}
                                        </button>
                                        <button className="cancel-button" onClick={cancelEdit}>בטל</button>
                                    </div>
                                </>
                            ) : (
                                <span className="profile-value">
                                    {field === 'street' ? user[field] || 'לא הוזן' : user[field]}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
