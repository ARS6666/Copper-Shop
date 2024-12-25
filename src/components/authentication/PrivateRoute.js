import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (window.location.href.includes('account') || window.location.href.includes('cart')) {
        if (!token) {
            return <Navigate to="/login" />;
        }
    }
    if (token) {
        if (window.location.href.includes('login') || window.location.href.includes('signin')) {
            return <Navigate to="/" />;
        }
    }
    return children;
};

export default PrivateRoute;
