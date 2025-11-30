// src/components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import SummaryCard from './SummaryCard';
import PositionCard from './PositionCard';
import PostPositionForm from './PostPositionForm';
import ViewApplications from './ViewApplications';
import WorkHourTracker from './WorkHourTracker';
import Reports from './Reports';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [dashboardView, setDashboardView] = useState('main'); // New state for different views
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [editingPosition, setEditingPosition] = useState(null);

  const [positions, setPositions] = useState(() => {
    try {
      const storedPositions = localStorage.getItem('positions');
      return storedPositions ? JSON.parse(storedPositions) : []; 
    } catch (e) {
      console.error("Could not load data from Local Storage", e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('positions', JSON.stringify(positions));
    } catch (e) {
      console.error("Could not save data to Local Storage", e);
    }
  }, [positions]);

  const [mockApplications, setMockApplications] = useState(() => {
    try {
      const storedApplications = localStorage.getItem('applications');
      return storedApplications ? JSON.parse(storedApplications) : [];
    } catch (e) {
      console.error("Could not load applications from Local Storage", e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('applications', JSON.stringify(mockApplications));
    } catch (e) {
      console.error("Could not save applications to Local Storage", e);
    }
  }, [mockApplications]);

  const handlePositionPosted = (newPosition) => {
    setPositions((prevPositions) => [newPosition, ...prevPositions]);
    setDashboardView('main');
  };

  const handleViewApplications = (positionId) => {
    const position = positions.find(p => p.id === positionId);
    setSelectedPosition(position);
    setDashboardView('view');
  };

  const handleBackToDashboard = () => {
    setDashboardView('main');
    setSelectedPosition(null);
    setEditingPosition(null);
  };

  const handleRemovePosition = (positionId) => {
    const isConfirmed = window.confirm("Are you sure you want to remove this position?");
    if (isConfirmed) {
      const updatedPositions = positions.filter(position => position.id !== positionId);
      setPositions(updatedPositions);
    }
  };

  const handleEditPosition = (positionId) => {
    const positionToEdit = positions.find(p => p.id === positionId);
    setEditingPosition(positionToEdit);
    setDashboardView('edit');
  };

  const handleUpdatePosition = (updatedPosition) => {
    const updatedPositions = positions.map(p =>
      p.id === updatedPosition.id ? updatedPosition : p
    );
    setPositions(updatedPositions);
    setEditingPosition(null);
    setDashboardView('main');
  };

  const handleAcceptApplication = (appId) => {
    setMockApplications(mockApplications.map(app =>
      app.id === appId ? { ...app, status: 'Accepted' } : app
    ));
    alert('Application accepted!');
  };

  const handleRejectApplication = (appId) => {
    setMockApplications(mockApplications.map(app =>
      app.id === appId ? { ...app, status: 'Rejected' } : app
    ));
    alert('Application rejected!');
  };

  const totalApplications = mockApplications.length;
  const avgApplications = positions.length > 0 ? (totalApplications / positions.length).toFixed(2) : '-';

  const summaryData = [
    { title: 'Total Positions', value: positions.length, subtext: `${positions.filter(p => p.status === 'Open').length} Currently open`, iconClass: 'fa-solid fa-briefcase' },
    { title: 'Total Applications', value: totalApplications, subtext: 'Across all positions', iconClass: 'fa-solid fa-users' },
    { title: 'Active Students', value: '45', subtext: 'Currently working', iconClass: 'fa-solid fa-user-group' },
    { title: 'Avg. Applications', value: avgApplications, subtext: 'Per position', iconClass: 'fa-solid fa-chart-line' },
  ];

  const renderContent = () => {
    if (dashboardView === 'view') {
      const relevantApplications = mockApplications.filter(app => app.positionId === selectedPosition.id);
      return (
        <ViewApplications
          position={selectedPosition}
          applications={relevantApplications}
          onBack={handleBackToDashboard}
          onAccept={handleAcceptApplication}
          onReject={handleRejectApplication}
        />
      );
    }

    if (dashboardView === 'post' || dashboardView === 'edit') {
      return (
        <PostPositionForm
          onPositionPosted={dashboardView === 'edit' ? handleUpdatePosition : handlePositionPosted}
          initialData={editingPosition}
          onBack={handleBackToDashboard}
        />
      );
    }
    
    if (dashboardView === 'trackHours') {
      return <WorkHourTracker onBack={handleBackToDashboard} />;
    }
    
    if (dashboardView === 'reports') {
      return <Reports onBack={handleBackToDashboard} />;
    }

    // Default main dashboard view
    return (
      <>
        <div className="dashboard-header-container">
          <h2 className="dashboard-title">Admin Dashboard</h2>
          <p className="dashboard-subtitle">Manage work-study opportunities and track applications</p>
          <button onClick={() => setDashboardView('post')} className="post-button">
            <i className="fa-solid fa-plus"></i> Post New Position
          </button>
        </div>
  
        <div className="summary-cards-container">
          {summaryData.map((data, index) => (
            <SummaryCard key={index} {...data} />
          ))}
        </div>
        <h2 className="section-title">Current Positions</h2>
        <div className="positions-container">
          {positions.length > 0 ? (
            positions.map(position => (
              <PositionCard
                key={position.id}
                {...position}
                onViewApplications={() => handleViewApplications(position.id)}
                onRemove={() => handleRemovePosition(position.id)}
                onEdit={() => handleEditPosition(position.id)}
              />
            ))
          ) : (
            <p>No positions available. Click "Post New Position" to add one.</p>
          )}
        </div>
        
        <div className="admin-actions-menu">
          <button onClick={() => setDashboardView('trackHours')}>Track Student Hours</button>
          <button onClick={() => setDashboardView('reports')}>Generate Reports</button>
        </div>
      </>
    );
  };
  
  return <div className="admin-dashboard">{renderContent()}</div>;
};

export default AdminDashboard;