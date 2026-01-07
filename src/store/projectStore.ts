import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ProjectStatus = 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled'
export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done'
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'

export interface Project {
  id: string
  name: string
  description: string
  status: ProjectStatus
  startDate: string
  endDate?: string
  budget?: number
  spent?: number
  progress: number
  teamMembers: string[]
  tags: string[]
  color: string
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface Task {
  id: string
  projectId: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  assignee?: string
  reporter: string
  dueDate?: string
  estimatedHours?: number
  actualHours?: number
  tags: string[]
  attachments: string[]
  comments: Comment[]
  subtasks: SubTask[]
  createdAt: string
  updatedAt: string
}

export interface SubTask {
  id: string
  title: string
  completed: boolean
}

export interface Comment {
  id: string
  userId: string
  userName: string
  content: string
  createdAt: string
}

export interface TimeEntry {
  id: string
  taskId: string
  userId: string
  userName: string
  hours: number
  description: string
  date: string
  createdAt: string
}

interface ProjectState {
  projects: Project[]
  tasks: Task[]
  timeEntries: TimeEntry[]
  
  // Project actions
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateProject: (id: string, data: Partial<Project>) => void
  deleteProject: (id: string) => void
  getProject: (id: string) => Project | undefined
  
  // Task actions
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'comments' | 'subtasks'>) => void
  updateTask: (id: string, data: Partial<Task>) => void
  deleteTask: (id: string) => void
  getTasksByProject: (projectId: string) => Task[]
  getTasksByAssignee: (assigneeId: string) => Task[]
  addComment: (taskId: string, comment: Omit<Comment, 'id' | 'createdAt'>) => void
  addSubTask: (taskId: string, title: string) => void
  toggleSubTask: (taskId: string, subtaskId: string) => void
  
  // Time tracking actions
  addTimeEntry: (entry: Omit<TimeEntry, 'id' | 'createdAt'>) => void
  getTimeEntriesByTask: (taskId: string) => TimeEntry[]
  getTimeEntriesByUser: (userId: string) => TimeEntry[]
  getTotalHoursByProject: (projectId: string) => number
  
  // Initialize demo data
  initializeDemoData: (userId: string) => void
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set, get) => ({
      projects: [],
      tasks: [],
      timeEntries: [],

      // Project actions
      addProject: (projectData) => {
        const newProject: Project = {
          ...projectData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        set((state) => ({ projects: [...state.projects, newProject] }))
      },

      updateProject: (id, data) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p
          ),
        }))
      },

      deleteProject: (id) => {
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
          tasks: state.tasks.filter((t) => t.projectId !== id),
        }))
      },

      getProject: (id) => {
        return get().projects.find((p) => p.id === id)
      },

      // Task actions
      addTask: (taskData) => {
        const newTask: Task = {
          ...taskData,
          id: Date.now().toString(),
          comments: [],
          subtasks: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        set((state) => ({ tasks: [...state.tasks, newTask] }))
      },

      updateTask: (id, data) => {
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, ...data, updatedAt: new Date().toISOString() } : t
          ),
        }))
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
          timeEntries: state.timeEntries.filter((e) => e.taskId !== id),
        }))
      },

      getTasksByProject: (projectId) => {
        return get().tasks.filter((t) => t.projectId === projectId)
      },

      getTasksByAssignee: (assigneeId) => {
        return get().tasks.filter((t) => t.assignee === assigneeId)
      },

      addComment: (taskId, commentData) => {
        const newComment: Comment = {
          ...commentData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        }
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId
              ? { ...t, comments: [...t.comments, newComment], updatedAt: new Date().toISOString() }
              : t
          ),
        }))
      },

      addSubTask: (taskId, title) => {
        const newSubTask: SubTask = {
          id: Date.now().toString(),
          title,
          completed: false,
        }
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId
              ? { ...t, subtasks: [...t.subtasks, newSubTask], updatedAt: new Date().toISOString() }
              : t
          ),
        }))
      },

      toggleSubTask: (taskId, subtaskId) => {
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId
              ? {
                  ...t,
                  subtasks: t.subtasks.map((st) =>
                    st.id === subtaskId ? { ...st, completed: !st.completed } : st
                  ),
                  updatedAt: new Date().toISOString(),
                }
              : t
          ),
        }))
      },

      // Time tracking actions
      addTimeEntry: (entryData) => {
        const newEntry: TimeEntry = {
          ...entryData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        }
        set((state) => ({ timeEntries: [...state.timeEntries, newEntry] }))
        
        // Update task actual hours
        const task = get().tasks.find(t => t.id === entryData.taskId)
        if (task) {
          get().updateTask(task.id, {
            actualHours: (task.actualHours || 0) + entryData.hours
          })
        }
      },

      getTimeEntriesByTask: (taskId) => {
        return get().timeEntries.filter((e) => e.taskId === taskId)
      },

      getTimeEntriesByUser: (userId) => {
        return get().timeEntries.filter((e) => e.userId === userId)
      },

      getTotalHoursByProject: (projectId) => {
        const projectTasks = get().getTasksByProject(projectId)
        const taskIds = projectTasks.map(t => t.id)
        return get().timeEntries
          .filter(e => taskIds.includes(e.taskId))
          .reduce((sum, e) => sum + e.hours, 0)
      },

      initializeDemoData: (userId) => {
        const { projects, tasks } = get()
        if (projects.length === 0) {
          // Add demo projects
          const demoProjects: Project[] = [
            {
              id: '1',
              name: 'Website Redesign',
              description: 'Complete redesign of company website with modern UI/UX',
              status: 'active',
              startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
              endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
              budget: 50000,
              spent: 15000,
              progress: 35,
              teamMembers: [userId, '2', '3'],
              tags: ['design', 'frontend', 'priority'],
              color: '#3b82f6',
              createdBy: userId,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            {
              id: '2',
              name: 'Mobile App Development',
              description: 'Native mobile app for iOS and Android platforms',
              status: 'planning',
              startDate: new Date().toISOString(),
              budget: 80000,
              spent: 0,
              progress: 10,
              teamMembers: [userId, '2'],
              tags: ['mobile', 'ios', 'android'],
              color: '#10b981',
              createdBy: userId,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ]
          
          // Add demo tasks
          const demoTasks: Task[] = [
            {
              id: '1',
              projectId: '1',
              title: 'Design homepage mockups',
              description: 'Create high-fidelity mockups for the new homepage',
              status: 'done',
              priority: 'high',
              assignee: '3',
              reporter: userId,
              dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
              estimatedHours: 16,
              actualHours: 14,
              tags: ['design', 'ui'],
              attachments: [],
              comments: [],
              subtasks: [],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            {
              id: '2',
              projectId: '1',
              title: 'Implement responsive navigation',
              description: 'Build mobile-friendly navigation component',
              status: 'in-progress',
              priority: 'high',
              assignee: '2',
              reporter: userId,
              dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
              estimatedHours: 8,
              actualHours: 4,
              tags: ['frontend', 'react'],
              attachments: [],
              comments: [],
              subtasks: [],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            {
              id: '3',
              projectId: '1',
              title: 'Setup CI/CD pipeline',
              description: 'Configure automated deployment pipeline',
              status: 'todo',
              priority: 'medium',
              assignee: userId,
              reporter: userId,
              dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
              estimatedHours: 6,
              tags: ['devops', 'automation'],
              attachments: [],
              comments: [],
              subtasks: [],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ]
          
          set({ projects: demoProjects, tasks: demoTasks })
        }
      },
    }),
    {
      name: 'taskflow-projects',
    }
  )
)
