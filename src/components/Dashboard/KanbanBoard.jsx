import React, { useState } from 'react'
import { Plus, Trash2, Edit2, GripVertical } from 'lucide-react'
import './KanbanBoard.css'

function KanbanBoard({ tasks, onAddTask, onUpdateTask, onDeleteTask }) {
  const [showModal, setShowModal] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [draggedTask, setDraggedTask] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo'
  })

  const columns = [
    { id: 'todo', title: 'To Do', color: '#64748b' },
    { id: 'in-progress', title: 'In Progress', color: '#f59e0b' },
    { id: 'done', title: 'Done', color: '#10b981' }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingTask) {
      onUpdateTask(editingTask.id, formData)
    } else {
      onAddTask(formData)
    }
    resetForm()
  }

  const resetForm = () => {
    setFormData({ title: '', description: '', priority: 'medium', status: 'todo' })
    setShowModal(false)
    setEditingTask(null)
  }

  const handleEdit = (task) => {
    setEditingTask(task)
    setFormData({
      title: task.title,
      description: task.description || '',
      priority: task.priority,
      status: task.status
    })
    setShowModal(true)
  }

  const handleDragStart = (task) => {
    setDraggedTask(task)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (status) => {
    if (draggedTask) {
      onUpdateTask(draggedTask.id, { status })
      setDraggedTask(null)
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ef4444'
      case 'medium': return '#f59e0b'
      case 'low': return '#10b981'
      default: return '#64748b'
    }
  }

  return (
    <div className="kanban-board">
      <div className="board-header">
        <h2>Task Board</h2>
        <button onClick={() => setShowModal(true)} className="btn-add">
          <Plus size={18} />
          Add Task
        </button>
      </div>

      <div className="board-columns">
        {columns.map(column => (
          <div 
            key={column.id} 
            className="column"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(column.id)}
          >
            <div className="column-header" style={{ borderTopColor: column.color }}>
              <h3>{column.title}</h3>
              <span className="task-count">
                {tasks.filter(t => t.status === column.id).length}
              </span>
            </div>

            <div className="column-tasks">
              {tasks
                .filter(task => task.status === column.id)
                .map(task => (
                  <div
                    key={task.id}
                    className="task-card"
                    draggable
                    onDragStart={() => handleDragStart(task)}
                  >
                    <div className="task-header">
                      <GripVertical size={16} className="drag-handle" />
                      <span 
                        className="priority-badge"
                        style={{ backgroundColor: getPriorityColor(task.priority) }}
                      >
                        {task.priority}
                      </span>
                    </div>
                    
                    <h4>{task.title}</h4>
                    {task.description && <p>{task.description}</p>}
                    
                    <div className="task-actions">
                      <button onClick={() => handleEdit(task)} className="btn-icon">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => onDeleteTask(task.id)} className="btn-icon danger">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={resetForm}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{editingTask ? 'Edit Task' : 'Create New Task'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="Enter task title"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter task description"
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" onClick={resetForm} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingTask ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default KanbanBoard
