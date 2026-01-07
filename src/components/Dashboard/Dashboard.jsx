import React, { useState, useEffect } from 'react'
import { LogOut, Plus, BarChart3, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import KanbanBoard from './KanbanBoard'
import Analytics from './Analytics'
import './Dashboard.css'

function Dashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('board')
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const storedTasks = localStorage.getItem(`tasks_${user.email}`)
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    } else {
      const defaultTasks = [
        {
          id: '1',
          title: 'Welcome to TaskFlow Manager',
          description: 'Drag and drop tasks between columns to manage your workflow',
          status: 'todo',
          priority: 'medium',
          createdAt: new Date().toISOString()
        }
      ]
      setTasks(defaultTasks)
      localStorage.setItem(`tasks_${user.email}`, JSON.stringify(defaultTasks))
    }
  }, [user.email])

  const saveTasks = (updatedTasks) => {
    setTasks(updatedTasks)
    localStorage.setItem(`tasks_${user.email}`, JSON.stringify(updatedTasks))
  }

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    saveTasks([...tasks, newTask])
  }

  const updateTask = (taskId, updates) => {
    saveTasks(tasks.map(task => task.id === taskId ? { ...task, ...updates } : task))
  }

  const deleteTask = (taskId) => {
    saveTasks(tasks.filter(task => task.id !== taskId))
  }

  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    done: tasks.filter(t => t.status === 'done').length
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo">
            <CheckCircle size={32} />
          </div>
          <div>
            <h1>TaskFlow Manager</h1>
            <p>Welcome back, {user.name}</p>
          </div>
        </div>
        
        <div className="header-stats">
          <div className="stat-card">
            <Clock size={20} />
            <div>
              <span className="stat-value">{stats.todo}</span>
              <span className="stat-label">To Do</span>
            </div>
          </div>
          <div className="stat-card">
            <AlertCircle size={20} />
            <div>
              <span className="stat-value">{stats.inProgress}</span>
              <span className="stat-label">In Progress</span>
            </div>
          </div>
          <div className="stat-card">
            <CheckCircle size={20} />
            <div>
              <span className="stat-value">{stats.done}</span>
              <span className="stat-label">Done</span>
            </div>
          </div>
        </div>

        <button onClick={onLogout} className="btn-logout">
          <LogOut size={18} />
          Logout
        </button>
      </header>

      <div className="dashboard-tabs">
        <button 
          className={`tab ${activeTab === 'board' ? 'active' : ''}`}
          onClick={() => setActiveTab('board')}
        >
          <Plus size={18} />
          Kanban Board
        </button>
        <button 
          className={`tab ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <BarChart3 size={18} />
          Analytics
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'board' && (
          <KanbanBoard 
            tasks={tasks}
            onAddTask={addTask}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
          />
        )}
        {activeTab === 'analytics' && (
          <Analytics tasks={tasks} />
        )}
      </div>
    </div>
  )
}

export default Dashboard
