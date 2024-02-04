// Dashboard.jsx
import React from 'react';
import MainContent from './MainContent';
import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';
import  './Dashboard.css';



function Dashboard() {
  return (
    <div className="container">
      <Sidebar />
      <MainContent />
      <RightSidebar />
  </div>
  );
}

export default Dashboard;
