import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Contact.css';

const Contact = () => {
    const navigate = useNavigate();
    const [contactMethod, setContactMethod] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleMethodSelect = (method) => {
        setContactMethod(method);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('הודעתך נשלחה בהצלחה!');
        setFormData({ name: '', email: '', message: '' });
        setContactMethod(null);
    };

    return (
        <div className="contact-container">
            <header className="contact-header">
                <button className="contact-back-button" onClick={() => navigate('/')}>
                    ← חזרה
                </button>
                <h1>יצירת קשר</h1>
            </header>

            <div className="contact-methods">
                <div className="contact-method-card">
                    <h3>📞 טלפון</h3>
                    <p>050-1234567</p>
                    <p className="contact-method-desc">זמן תגובה: עד 2 שעות</p>
                </div>

                <div className="contact-method-card">
                    <h3>📧 דוא"ל</h3>
                    <p>support@carrentals.co.il</p>
                    <p className="contact-method-desc">זמן תגובה: עד 24 שעות</p>
                </div>

                <div className="contact-method-card">
                    <h3>💬 צ'אט חי</h3>
                    <p>פתוח 24/7</p>
                    <p className="contact-method-desc">שיחה מיידית עם נציגנו</p>
                </div>

                <div className="contact-method-card">
                    <h3>📝 טופס דוא"ל</h3>
                    <button className="contact-form-button" onClick={() => handleMethodSelect('email-form')}>
                        שלח הודעה
                    </button>
                </div>
            </div>

            {contactMethod === 'email-form' && (
                <div className="contact-form-container">
                    <form onSubmit={handleSubmit} className="contact-form">
                        <input
                            type="text"
                            name="name"
                            placeholder="שמך"
                            value={formData.name}
                            onChange={handleFormChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder='כתובת דוא"ל'
                            value={formData.email}
                            onChange={handleFormChange}
                            required
                        />
                        <textarea
                            name="message"
                            placeholder="הודעתך"
                            value={formData.message}
                            onChange={handleFormChange}
                            rows="6"
                            required
                        ></textarea>
                        <button type="submit" className="contact-submit-button">
                            שלח הודעה
                        </button>
                        <button
                            type="button"
                            className="contact-cancel-button"
                            onClick={() => {
                                setContactMethod(null);
                                setFormData({ name: '', email: '', message: '' });
                            }}
                        >
                            ביטול
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Contact;
