import { Outlet, Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Projects', href: '/projects' },
  { name: 'Tasks', href: '/tasks' },
  { name: 'Team', href: '/team' },
  { name: 'Calendar', href: '/calendar' },
  { name: 'Time Tracking', href: '/time-tracking' },
  { name: 'Reports', href: '/reports' },
  { name: 'Settings', href: '/settings' },
]

export default function DashboardLayout() {
  const location = useLocation()
  const { user, logout } = useAuthStore()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 z-40 w-64 h-screen bg-white border-r">
        <div className="h-full px-3 py-4 overflow-y-auto">
          <div className="mb-8 px-3">
            <h1 className="text-2xl font-bold text-blue-600">TaskFlow</h1>
            <p className="text-sm text-gray-500">Project Manager</p>
          </div>
          
          <nav className="space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="absolute bottom-4 left-3 right-3">
            <div className="p-3 bg-gray-100 rounded-lg mb-2">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="ml-64">
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
