import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'manager' | 'developer' | 'designer' | 'client'
  avatar?: string
  department?: string
  phone?: string
  bio?: string
  joinedAt: string
}

interface AuthState {
  user: User | null
  users: User[]
  login: (email: string, password: string) => Promise<boolean>
  register: (data: Omit<User, 'id' | 'joinedAt'> & { password: string }) => Promise<boolean>
  logout: () => void
  updateProfile: (data: Partial<User>) => void
  initializeDemoData: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      users: [],
      
      login: async (email: string, password: string) => {
        const { users } = get()
        const user = users.find(u => u.email === email)
        
        if (user) {
          set({ user })
          return true
        }
        return false
      },

      register: async (data) => {
        const { users } = get()
        
        if (users.find(u => u.email === data.email)) {
          return false
        }

        const newUser: User = {
          id: Date.now().toString(),
          email: data.email,
          name: data.name,
          role: data.role,
          avatar: data.avatar,
          department: data.department,
          phone: data.phone,
          bio: data.bio,
          joinedAt: new Date().toISOString(),
        }

        set({ 
          users: [...users, newUser],
          user: newUser 
        })
        return true
      },

      logout: () => {
        set({ user: null })
      },

      updateProfile: (data) => {
        const { user, users } = get()
        if (user) {
          const updatedUser = { ...user, ...data }
          set({ 
            user: updatedUser,
            users: users.map(u => u.id === user.id ? updatedUser : u)
          })
        }
      },

      initializeDemoData: () => {
        const { users } = get()
        if (users.length === 0) {
          const demoUsers: User[] = [
            {
              id: '1',
              email: 'admin@taskflow.com',
              name: 'Admin User',
              role: 'admin',
              department: 'Management',
              joinedAt: new Date().toISOString(),
            },
            {
              id: '2',
              email: 'john@taskflow.com',
              name: 'John Developer',
              role: 'developer',
              department: 'Engineering',
              joinedAt: new Date().toISOString(),
            },
            {
              id: '3',
              email: 'sarah@taskflow.com',
              name: 'Sarah Designer',
              role: 'designer',
              department: 'Design',
              joinedAt: new Date().toISOString(),
            },
          ]
          set({ users: demoUsers })
        }
      },
    }),
    {
      name: 'taskflow-auth',
    }
  )
)
