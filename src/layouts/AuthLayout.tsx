import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">TaskFlow Manager</h1>
          <p className="text-blue-100">Enterprise Project Management</p>
        </div>
        <Outlet />
      </div>
    </div>
  )
}
