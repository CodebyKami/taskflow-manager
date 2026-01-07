import React from 'react'
import { TrendingUp, CheckCircle, Clock, AlertCircle, Target } from 'lucide-react'
import './Analytics.css'

function Analytics({ tasks }) {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.status === 'done').length
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length
  const todoTasks = tasks.filter(t => t.status === 'todo').length
  
  const completionRate = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : 0
  
  const priorityBreakdown = {
    high: tasks.filter(t => t.priority === 'high').length,
    medium: tasks.filter(t => t.priority === 'medium').length,
    low: tasks.filter(t => t.priority === 'low').length
  }

  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)

  return (
    <div className="analytics">
      <div className="analytics-header">
        <h2>Analytics Dashboard</h2>
        <p>Track your productivity and task completion</p>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card highlight">
          <div className="card-icon" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
            <Target size={24} />
          </div>
          <div className="card-content">
            <h3>Completion Rate</h3>
            <div className="big-number">{completionRate}%</div>
            <p>{completedTasks} of {totalTasks} tasks completed</p>
          </div>
        </div>

        <div className="analytics-card">
          <div className="card-icon" style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}>
            <CheckCircle size={24} />
          </div>
          <div className="card-content">
            <h3>Completed</h3>
            <div className="big-number">{completedTasks}</div>
            <p>Tasks finished</p>
          </div>
        </div>

        <div className="analytics-card">
          <div className="card-icon" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
            <AlertCircle size={24} />
          </div>
          <div className="card-content">
            <h3>In Progress</h3>
            <div className="big-number">{inProgressTasks}</div>
            <p>Active tasks</p>
          </div>
        </div>

        <div className="analytics-card">
          <div className="card-icon" style={{ background: 'linear-gradient(135deg, #64748b, #475569)' }}>
            <Clock size={24} />
          </div>
          <div className="card-content">
            <h3>To Do</h3>
            <div className="big-number">{todoTasks}</div>
            <p>Pending tasks</p>
          </div>
        </div>
      </div>

      <div className="analytics-section">
        <h3>Priority Breakdown</h3>
        <div className="priority-chart">
          <div className="priority-bar">
            <div className="bar-label">
              <span className="priority-dot high"></span>
              High Priority
            </div>
            <div className="bar-container">
              <div 
                className="bar-fill high" 
                style={{ width: `${totalTasks > 0 ? (priorityBreakdown.high / totalTasks) * 100 : 0}%` }}
              ></div>
            </div>
            <span className="bar-value">{priorityBreakdown.high}</span>
          </div>

          <div className="priority-bar">
            <div className="bar-label">
              <span className="priority-dot medium"></span>
              Medium Priority
            </div>
            <div className="bar-container">
              <div 
                className="bar-fill medium" 
                style={{ width: `${totalTasks > 0 ? (priorityBreakdown.medium / totalTasks) * 100 : 0}%` }}
              ></div>
            </div>
            <span className="bar-value">{priorityBreakdown.medium}</span>
          </div>

          <div className="priority-bar">
            <div className="bar-label">
              <span className="priority-dot low"></span>
              Low Priority
            </div>
            <div className="bar-container">
              <div 
                className="bar-fill low" 
                style={{ width: `${totalTasks > 0 ? (priorityBreakdown.low / totalTasks) * 100 : 0}%` }}
              ></div>
            </div>
            <span className="bar-value">{priorityBreakdown.low}</span>
          </div>
        </div>
      </div>

      <div className="analytics-section">
        <h3>Recent Tasks</h3>
        <div className="recent-tasks">
          {recentTasks.length > 0 ? (
            recentTasks.map(task => (
              <div key={task.id} className="recent-task-item">
                <div className="task-info">
                  <h4>{task.title}</h4>
                  <p>{new Date(task.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="task-badges">
                  <span className={`status-badge ${task.status}`}>
                    {task.status.replace('-', ' ')}
                  </span>
                  <span className={`priority-badge ${task.priority}`}>
                    {task.priority}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="empty-state">No tasks yet. Create your first task to get started!</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Analytics
