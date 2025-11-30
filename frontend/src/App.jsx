// src/App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import InfoCard from './components/InfoCard';
import AdminDashboard from './components/AdminDashboard';
import StudentDashboard from './components/StudentDashboard';
import AuthForm from './components/AuthForm';
import './App.css';

const App = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [user, setUser] = useState(null);
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', onLocationChange);
    return () => window.removeEventListener('popstate', onLocationChange);
  }, []);

  // -----------------------
  // UPDATED LOGIN SUCCESS
  // -----------------------
  const handleAuthSuccess = (userData) => {
    setUser(userData);
    sessionStorage.setItem("currentUser", JSON.stringify(userData));

    const role = userData.role.toLowerCase();

    if (role === "admin") {
      window.history.pushState({}, "", "/admin-dashboard");
      setCurrentPath("/admin-dashboard");
    } else {
      window.history.pushState({}, "", "/student-portal");
      setCurrentPath("/student-portal");
    }

    setIsRegisterMode(false);
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem('currentUser');
    window.history.pushState({}, '', '/');
    setCurrentPath('/');
  };

  // -----------------------
  // UPDATED ROUTER
  // -----------------------
  const getRoute = () => {
    if (user && user.role?.toLowerCase() === 'admin' && currentPath === '/admin-dashboard') {
      return <AdminDashboard />;
    }
    if (user && user.role?.toLowerCase() === 'student' && currentPath === '/student-portal') {
      return <StudentDashboard />;
    }

    if (currentPath === '/admin-login') {
      return (
        <AuthForm
          role="Admin"
          isRegister={isRegisterMode}
          onAuthSuccess={handleAuthSuccess}
          onToggleMode={() => setIsRegisterMode(!isRegisterMode)}
        />
      );
    }
    if (currentPath === '/student-login') {
      return (
        <AuthForm
          role="Student"
          isRegister={isRegisterMode}
          onAuthSuccess={handleAuthSuccess}
          onToggleMode={() => setIsRegisterMode(!isRegisterMode)}
        />
      );
    }

    return (
      <div className="landing-content">
        <h1 className="main-title">Work-Study Program Management Portal</h1>
        <p className="subtitle">
          Streamline work-study opportunities, applications, and performance tracking
          for administrators and students in one comprehensive platform.
        </p>
        <div className="card-container">
          <InfoCard
            title="For Administrators"
            features={[
              'Post work-study opportunities',
              'Manage student applications',
              'Track student work hours',
              'Generate performance reports'
            ]}
            buttonText="Admin Dashboard"
            iconClass="fa-solid fa-user-gear"
            linkTo="/admin-login"
          />
          <InfoCard
            title="For Students"
            features={[
              'Browse available positions',
              'Submit applications online',
              'Track your work hours',
              'Receive feedback & updates'
            ]}
            buttonText="Student Portal"
            iconClass="fa-solid fa-user-graduate"
            linkTo="/student-login"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="app-container">
      <Header currentPath={currentPath} user={user} onLogout={handleLogout} />
      {getRoute()}
    </div>
  );
};

export default App;
