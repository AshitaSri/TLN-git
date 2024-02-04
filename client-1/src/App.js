// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SmallestNumberGame from './components/Task1';
import MatchTheColumnGame from './components/Task2';
import FillInBlanksGame from './components/Task3';
import Login from './components/Login';

const App = () => {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/task1" element={<SmallestNumberGame />} />
        <Route path="/task2" element={<MatchTheColumnGame />} />
        <Route path="/task3" element={<FillInBlanksGame />} />
      </Routes>
    </Router>
  );
};

export default App;
