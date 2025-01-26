import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import './App.css';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed top-4 left-4 z-30 p-2 text-2xl bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 focus:outline-none sm:top-6 sm:left-6"
        aria-label="Open Sidebar"
      >
        ☰
      </button>

      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        tasks={tasks} 
      />

      {/* Main Content */}
      <MainContent tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
