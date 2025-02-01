import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const location = useLocation();
    if (!token) {
        return <Link to="/login" />;
    }
    return children;
};

export default PrivateRoute;