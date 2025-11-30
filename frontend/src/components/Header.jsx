// src/components/Header.jsx
import React from 'react';
import logo from '../components/logo.png';

const Header = ({ currentPath, user, onLogout }) => {
  const getLinkClass = (path) => {
    return `nav-link ${currentPath === path ? 'active' : ''}`;
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="WorkStudy Portal Logo" className="logo-img" />
      </div>
      <nav>
        <a href="/" className={getLinkClass('/')}>Home</a>
        
        {user ? (
          <>
            <a href="/admin-dashboard" className={getLinkClass('/admin-dashboard')}>
              <i className="fas fa-user-shield"></i> Admin Portal
            </a>
            <a href="/student-portal" className={getLinkClass('/student-portal')}>
              <i className="fas fa-user-alt"></i> Student Portal
            </a>
            <span className="user-info">Logged in as: <strong>{user.username}</strong></span>
            <button onClick={onLogout} className="logout-button">Logout</button>
          </>
        ) : (
          <>
            <a href="/admin-login" className={getLinkClass('/admin-login')}>
              <i className="fas fa-user-shield"></i> Admin Login
            </a>
            <a href="/student-login" className={getLinkClass('/student-login')}>
              <i className="fas fa-user-alt"></i> Student Login
            </a>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;