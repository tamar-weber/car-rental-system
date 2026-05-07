import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/authApi';
import '../styles/Register.css';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: '', last_name: '', phone: '', email: '',
        password: '', city: '', neighborhood: '', street: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await registerUser(formData);
        if (response.user) {
            localStorage.setItem('user', JSON.stringify(response.user));
            alert("נרשמת בהצלחה!");
            navigate('/dashboard', { state: { success: response.message } });
        } else {
            setError(response.error || 'שגיאה ברישום');
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2 className="register-title">יצירת חשבון חדש</h2>
                <form onSubmit={handleSubmit} className="form-grid">
                    <input className="register-input" name="first_name" placeholder="שם פרטי" onChange={handleChange} required />
                    <input className="register-input" name="last_name" placeholder="שם משפחה" onChange={handleChange} required />
                    <input className="register-input full-width" name="phone" placeholder="טלפון" onChange={handleChange} required />
                    <input className="register-input full-width" name="email" type="email" placeholder="אימייל" onChange={handleChange} required />
                    <input className="register-input full-width" name="password" type="password" placeholder="סיסמה" onChange={handleChange} required />
                    <input className="register-input" name="city" placeholder="עיר" onChange={handleChange} required />
                    <input className="register-input" name="neighborhood" placeholder="שכונה" onChange={handleChange} required />
                    <input className="register-input full-width" name="street" placeholder="רחוב (אופציונלי)" onChange={handleChange} />
                    {error && <div className="register-error">{error}</div>}
                    <button type="submit" className="register-button">הירשם עכשיו</button>
                </form>
            </div>
        </div>
    );
};

export default Register;