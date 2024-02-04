// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="left-section">
      <div className="sidebar">
        <div className="item" id="active">
          <i className='bx bx-home-alt-2'></i>
          <Link to="/">Home</Link>
        </div>
        <div className="item">
          <i className='bx bx-grid-alt'></i>
          <Link to="/task1">Task1</Link>
        </div>
        <div className="item">
          <i className='bx bx-folder'></i>
          <Link to="/task2">Task2</Link>
        </div>
        <div className="item">
          <i className='bx bx-message-square-dots'></i>
          <Link to="/task3">Task3</Link>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
