import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { useAuthStore } from '@/store/authStore'
import { useProjectStore } from '@/store/projectStore'
import { useEffect } from 'react'
import AuthLayout from '@/layouts/AuthLayout'
import DashboardLayout from '@/layouts/DashboardLayout'
import Login from '@/pages/auth/Login'
import Register from '@/pages/auth/Register'
import Dashboard from '@/pages/dashboard/Dashboard'
import Projects from '@/pages/projects/Projects'
import ProjectDetail from '@/pages/projects/ProjectDetail'
import Tasks from '@/pages/tasks/Tasks'
import Team from '@/pages/team/Team'
import Calendar from '@/pages/calendar/Calendar'
import Reports from '@/pages/reports/Reports'
import Settings from '@/pages/settings/Settings'
import TimeTracking from '@/pages/time/TimeTracking'

function App() {
  const { user, initializeDemoData } = useAuthStore()
  const { initializeDemoData: initProjectData } = useProjectStore()

  useEffect(() => {
    initializeDemoData()
    if (user) {
      initProjectData(user.id)
    }
  }, [user, initializeDemoData, initProjectData])

  return (
    <>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
          </Route>

          {/* Protected Routes */}
          <Route element={user ? <DashboardLayout /> : <Navigate to="/login" />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/team" element={<Team />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/time-tracking" element={<TimeTracking />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Default Route */}
          <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
        </Routes>
      </Router>
      <Toaster position="top-right" richColors />
    </>
  )
}

export default App
