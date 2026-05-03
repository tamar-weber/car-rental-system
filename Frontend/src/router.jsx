import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login'; // ודאי שהקובץ קיים

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* דף הבית יפנה להתחברות כברירת מחדל */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* כאן יבוא הדאשבורד בהמשך */}
      </Routes>
    </Router>
  );
};

export default AppRouter;