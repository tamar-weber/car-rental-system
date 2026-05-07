import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../api/authApi';
import '../styles/MainScreen.css';

const MainScreen = () => {
    const navigate = useNavigate();
    const [activeModal, setActiveModal] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [pendingNavigation, setPendingNavigation] = useState(null);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [registerData, setRegisterData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        password: '',
        city: '',
        neighborhood: '',
        street: ''
    });
    const [formError, setFormError] = useState('');

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            const userData = JSON.parse(user);
            setIsLoggedIn(true);
            setUserName(userData.first_name);
        }
    }, []);

    const openModal = (type, navigation = null) => {
        setFormError('');
        setActiveModal(type);
        setPendingNavigation(navigation);
    };

    const closeModal = () => {
        setActiveModal(null);
        setFormError('');
        setPendingNavigation(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUserName('');
        navigate('/');
    };

    const handleFeatureClick = (path) => {
        if (isLoggedIn) {
            navigate(path);
        } else {
            openModal('login', path);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setFormError('');

        const response = await loginUser(loginData);
        if (response.user) {
            localStorage.setItem('user', JSON.stringify(response.user));
            setIsLoggedIn(true);
            setUserName(response.user.first_name);
            setSuccessMessage(`ברוכים הבאים, ${response.user.first_name}!`);
            setLoginData({ email: '', password: '' });
            closeModal();
        } else {
            setFormError(response.error || 'פרטים שגויים, נסו שנית');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setFormError('');

        const response = await registerUser(registerData);
        if (response.user) {
            localStorage.setItem('user', JSON.stringify(response.user));
            setIsLoggedIn(true);
            setUserName(response.user.first_name);
            setSuccessMessage('נרשמת בהצלחה!');
            setRegisterData({
                first_name: '',
                last_name: '',
                phone: '',
                email: '',
                password: '',
                city: '',
                neighborhood: '',
                street: ''
            });
            closeModal();
        } else {
            setFormError(response.error || 'שגיאה ברישום, נסי שוב');
        }
    };

    return (
        <div className="main-screen">
                <div className="main-screen__top-bar">
                <div className="main-screen__nav">
                    {isLoggedIn ? (
                        <div className="main-screen__user-menu">
                            <span className="main-screen__user-name">ברוכים הבאים, {userName}!</span>
                            <button className="main-screen__logout-button" onClick={handleLogout}>
                                התנתק
                            </button>
                        </div>
                    ) : (
                        <>
                            <button className="main-screen__nav-button" onClick={() => openModal('login')}>
                                התחברות
                            </button>
                            <button className="main-screen__nav-button main-screen__nav-button--accent" onClick={() => openModal('register')}>
                                הרשמה
                            </button>
                        </>
                    )}
                </div>
            </div>

            {successMessage && (
                <div className="main-screen__success-message">
                    {successMessage}
                </div>
            )}

            <section className="main-screen__center-grid">
                <div className="circle-card" onClick={() => handleFeatureClick('/dashboard')}>
                    <div className="circle-card__icon">👤</div>
                    <span>אזור אישי</span>
                </div>
                <div className="circle-card" onClick={() => handleFeatureClick('/orders')}>
                    <div className="circle-card__icon">🚗</div>
                    <span>הזמנות</span>
                </div>
                <div className="circle-card" onClick={() => handleFeatureClick('/contact')}>
                    <div className="circle-card__icon">📞</div>
                    <span>יצירת קשר</span>
                </div>
                <div className="circle-card" onClick={() => handleFeatureClick('/contact')}>
                    <div className="circle-card__icon">ℹ️</div>
                    <span>מידע</span>
                </div>
            </section>

            <section className="main-screen__contact-footer">
                <p><span className="contact-icon">📞</span><a href="tel:0554008401">0554008401</a></p>
                <p><span className="contact-icon">✉️</span><a href="mailto:tamar8438082@gmail.com">tamar8438082@gmail.com</a></p>
            </section>

            {activeModal && (
                <div className="main-screen__modal-overlay" onClick={closeModal}>
                    <div className="main-screen__modal" onClick={(e) => e.stopPropagation()}>
                        <div className="main-screen__modal-header">
                            <h2>{activeModal === 'login' ? 'התחברות' : 'הרשמה'}</h2>
                            <button className="main-screen__modal-close" onClick={closeModal}>
                                ✕
                            </button>
                        </div>

                        {activeModal === 'login' ? (
                            <form onSubmit={handleLogin} className="main-screen__form">
                                <input
                                    className="main-screen__input"
                                    type="email"
                                    placeholder="אימייל"
                                    value={loginData.email}
                                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                    required
                                />
                                <input
                                    className="main-screen__input"
                                    type="password"
                                    placeholder="סיסמה"
                                    value={loginData.password}
                                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                    required
                                />
                                {formError && <div className="main-screen__error">{formError}</div>}
                                <button type="submit" className="main-screen__submit-button">התחבר</button>
                                <p className="main-screen__modal-switch">
                                    אין לך חשבון? <span onClick={() => openModal('register')}>הרשם כאן</span>
                                </p>
                            </form>
                        ) : (
                            <form onSubmit={handleRegister} className="main-screen__form">
                                <div className="main-screen__form-grid">
                                    <input
                                        className="main-screen__input"
                                        name="first_name"
                                        placeholder="שם פרטי"
                                        value={registerData.first_name}
                                        onChange={(e) => setRegisterData({ ...registerData, first_name: e.target.value })}
                                        required
                                    />
                                    <input
                                        className="main-screen__input"
                                        name="last_name"
                                        placeholder="שם משפחה"
                                        value={registerData.last_name}
                                        onChange={(e) => setRegisterData({ ...registerData, last_name: e.target.value })}
                                        required
                                    />
                                </div>
                                <input
                                    className="main-screen__input"
                                    name="phone"
                                    placeholder="טלפון"
                                    value={registerData.phone}
                                    onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                                    required
                                />
                                <input
                                    className="main-screen__input"
                                    name="email"
                                    type="email"
                                    placeholder="אימייל"
                                    value={registerData.email}
                                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                                    required
                                />
                                <input
                                    className="main-screen__input"
                                    name="password"
                                    type="password"
                                    placeholder="סיסמה"
                                    value={registerData.password}
                                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                                    required
                                />
                                <div className="main-screen__form-grid">
                                    <input
                                        className="main-screen__input"
                                        name="city"
                                        placeholder="עיר"
                                        value={registerData.city}
                                        onChange={(e) => setRegisterData({ ...registerData, city: e.target.value })}
                                        required
                                    />
                                    <input
                                        className="main-screen__input"
                                        name="neighborhood"
                                        placeholder="שכונה"
                                        value={registerData.neighborhood}
                                        onChange={(e) => setRegisterData({ ...registerData, neighborhood: e.target.value })}
                                        required
                                    />
                                </div>
                                <input
                                    className="main-screen__input"
                                    name="street"
                                    placeholder="רחוב (אופציונלי)"
                                    value={registerData.street}
                                    onChange={(e) => setRegisterData({ ...registerData, street: e.target.value })}
                                />
                                {formError && <div className="main-screen__error">{formError}</div>}
                                <button type="submit" className="main-screen__submit-button">הרשם</button>
                                <p className="main-screen__modal-switch">
                                    כבר יש לך חשבון? <span onClick={() => openModal('login')}>התחבר כאן</span>
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MainScreen;
