import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/authApi';
import '../styles/Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await loginUser(credentials);
        if (response.user) {
            alert("התחברת בהצלחה!");
            navigate('/dashboard'); 
        } else {
            alert("פרטים שגויים, נסו שנית");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 style={{ color: '#7879F1' }}>התחברות למערכת</h2>
                <form onSubmit={handleSubmit}>
                    <input className="login-input" type="email" placeholder="אימייל" 
                           onChange={e => setCredentials({...credentials, email: e.target.value})} required />
                    <input className="login-input" type="password" placeholder="סיסמה" 
                           onChange={e => setCredentials({...credentials, password: e.target.value})} required />
                    <button type="submit" className="login-button">התחבר</button>
                </form>
                <p style={{ marginTop: '2vh', cursor: 'pointer', color: '#EF5DA8' }} onClick={() => navigate('/register')}>
                    עוד לא רשום? הירשם כאן
                </p>
            </div>
        </div>
    );
};

export default Login;