import { useAuthStore } from '@/store/authStore'
import { useProjectStore } from '@/store/projectStore'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { user } = useAuthStore()
  const { projects, tasks } = useProjectStore()

  const activeProjects = projects.filter(p => p.status === 'active')
  const myTasks = tasks.filter(t => t.assignee === user?.id)
  const completedTasks = tasks.filter(t => t.status === 'done')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {user?.name}! 👋</h1>
        <p className="text-gray-600 mt-1">Here's what's happening with your projects today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Projects</p>
              <p className="text-3xl font-bold mt-2">{activeProjects.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">My Tasks</p>
              <p className="text-3xl font-bold mt-2">{myTasks.length}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-3xl font-bold mt-2">{completedTasks.length}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Projects</p>
              <p className="text-3xl font-bold mt-2">{projects.length}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Recent Projects</h2>
            <Link to="/projects" className="text-blue-600 hover:underline text-sm">
              View All
            </Link>
          </div>
        </div>
        <div className="p-6">
          {projects.length > 0 ? (
            <div className="space-y-4">
              {projects.slice(0, 5).map((project) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  className="block p-4 border rounded-lg hover:border-blue-500 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{project.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded ${
                      project.status === 'active' ? 'bg-green-100 text-green-700' :
                      project.status === 'planning' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{project.teamMembers.length} members</span>
                    <span>{project.progress}% complete</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No projects yet. Create your first project to get started!</p>
              <Link to="/projects" className="text-blue-600 hover:underline mt-2 inline-block">
                Create Project
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
