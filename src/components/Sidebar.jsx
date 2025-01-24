import React from 'react'
import { useState } from 'react'
import PieChart from './PieChart'

export default function Sidebar({ isOpen, onClose, tasks }) {
  const [photo, setPhoto] = useState(null)
  const [lists, setLists] = useState([])
  const [newListName, setNewListName] = useState('')
  const [username, setUsername] = useState("John Doe")
  const [isEditingName, setIsEditingName] = useState(false)

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setPhoto(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleAddList = (e) => {
    e.preventDefault()
    if (newListName.trim()) {
      setLists([...lists, newListName])
      setNewListName('')
    }
  }

  const handleNameUpdate = (e) => {
    if (e.key === "Enter" || e.type === "blur") {
      setIsEditingName(false)
      const newName = e.target.value.trim()
      if (newName) setUsername(newName)
    }
  }

  return (
    <div className={`fixed left-0 top-0 h-full w-64 bg-black-50 shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50 border-r`}>
      <button onClick={onClose} className="absolute right-2 top-2 text-2xl text-gray-600 hover:text-gray-800">
        ×
      </button>
      
      <div className="p-4 mt-8 flex flex-col items-center h-[calc(100%-4rem)]">
        {/* Profile Section */}
        <div className="relative mb-4 group cursor-pointer" onClick={() => document.getElementById('file-input').click()}>
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-gray-300">
            {photo ? (
              <img src={photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl text-gray-500">+</span>
            )}
          </div>
          <input
            id="file-input"
            type="file"
            onChange={handlePhotoUpload}
            className="hidden"
            accept="image/*"
          />
        </div>

        {/* Editable Username */}
        <h2 className="text-xl font-semibold mb-6 text-white-800">
          {isEditingName ? (
            <input
              type="text"
              defaultValue={username}
              onKeyDown={handleNameUpdate}
              onBlur={handleNameUpdate}
              autoFocus
              className="bg-transparent text-center border-b-2 border-emerald-500 focus:outline-none"
            />
          ) : (
            <span
              onClick={() => setIsEditingName(true)}
              className="text-white cursor-text hover:bg-gray-500 px-2 rounded transition-colors"
            >
              {username}
            </span>
          )}
        </h2>

        {/* Main Sections */}
        <div className="flex flex-col justify-between h-full w-full">
          {/* Lists Section */}
          <div className="bg-black h-[40%] mb-4 rounded-lg p-2 overflow-y-auto border">
            <h3 className="text-sm font-medium text-white-600 mb-2">Your Lists</h3>
            <div className="space-y-1">
              {lists.map((list, index) => (
                <div 
                  key={index} 
                  className="p-2 bg-black-50 rounded-md text-white-700 hover:bg-gray-500 cursor-pointer transition-colors"
                >
                  {list}
                </div>
              ))}
            </div>
          </div>

          {/* Add List Section */}
          <div className="bg-black h-[15%] mb-4 rounded-lg p-2 border">
            <form onSubmit={handleAddList} className="flex flex-col gap-2">
              <input
                type="text"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                placeholder="Enter list name"
                className="w-full p-1 text-sm rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="w-full bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors text-sm"
              >
                Add List
              </button>
            </form>
          </div>

          {/* Progress Section */}
          <div className="bg-black h-[40%] rounded-lg p-2 border flex flex-col">
            <h3 className="text-sm font-medium text-white-600 mb-2">Task Progress ({tasks.length})</h3>
            <div className="flex-1 flex items-center justify-center">
              {tasks.length > 0 ? (
                <PieChart 
                  completed={tasks.filter(t => t.completed).length}
                  total={tasks.length}
                />
              ) : (
                <div className="text-gray-400 text-sm text-center">
                  No tasks to display
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}