import React from 'react'
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import './App.css'

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [tasks, setTasks] = useState([])


  return (
    <div className="min-h-screen bg-black text-white">
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed top-4 left-4 z-30 p-2 text-2xl"
      >
        ☰
      </button>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} tasks={tasks} />

      <MainContent tasks={tasks} setTasks={setTasks} />
        
      
    </div>
  )
}