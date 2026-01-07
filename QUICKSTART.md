# ⚡ Quick Start Guide - TaskFlow Manager

Get up and running in 5 minutes!

---

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/CodebyKami/taskflow-manager.git

# Navigate to project
cd taskflow-manager

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Demo Login

```
Email: admin@taskflow.com
Password: admin123
```

Or create a new account by clicking "Sign up"!

---

## 📱 Features Overview

### 1. Dashboard
- View all your projects and tasks at a glance
- See statistics and progress
- Quick actions for common tasks

### 2. Projects
- Create new projects with budgets and deadlines
- Track progress and spending
- Assign team members

### 3. Tasks
- Organize tasks in Kanban board
- Drag and drop to change status
- Set priorities and due dates
- Add comments and subtasks

### 4. Team
- View all team members
- Assign roles and permissions
- Track individual performance

### 5. Time Tracking
- Log hours on tasks
- Generate timesheets
- Track billable time

### 6. Calendar
- Visual timeline of all tasks
- See upcoming deadlines
- Drag to reschedule

### 7. Reports
- Project analytics
- Team performance metrics
- Budget analysis
- Time tracking reports

### 8. Settings
- Update your profile
- Customize preferences
- Configure notifications

---

## 🎯 Common Tasks

### Create a Project

1. Click "Projects" in sidebar
2. Click "New Project" button
3. Fill in project details
4. Click "Create Project"

### Add a Task

1. Go to "Tasks" page
2. Click "Add Task" button
3. Fill in task details
4. Assign to team member
5. Set priority and due date
6. Click "Create Task"

### Track Time

1. Go to "Time Tracking"
2. Select a task
3. Enter hours worked
4. Add description
5. Click "Log Time"

### View Reports

1. Go to "Reports" page
2. Select report type
3. Choose date range
4. View analytics and charts

---

## 🛠️ Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Project Structure

```
src/
├── components/ui/    # Reusable UI components
├── layouts/          # Layout components
├── pages/            # Page components
├── store/            # State management
├── lib/              # Utilities
├── App.tsx           # Main app
└── main.tsx          # Entry point
```

---

## 🌐 Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Or use the one-click deploy button in README.md!

---

## 📚 Learn More

- **Full Documentation**: [README.md](README.md)
- **Deployment Guide**: [DEPLOYMENT.md](DEPLOYMENT.md)
- **Upgrade Notes**: [UPGRADE.md](UPGRADE.md)

---

## 💡 Tips

1. **Use Keyboard Shortcuts**: Press `?` to see shortcuts
2. **Dark Mode**: Toggle in settings
3. **Drag and Drop**: Drag tasks between columns
4. **Quick Search**: Use search bar to find anything
5. **Notifications**: Enable browser notifications

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- --port 3001
```

### Dependencies Error

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Error

```bash
# Check TypeScript errors
npx tsc --noEmit

# Fix linting issues
npm run lint --fix
```

---

## 📞 Need Help?

- 📧 Email: support@taskflow.com
- 💬 GitHub Issues: [Report Issue](https://github.com/CodebyKami/taskflow-manager/issues)
- 📚 Documentation: [Read Full Docs](README.md)

---

<div align="center">

**Happy Task Managing! 🎉**

[⭐ Star on GitHub](https://github.com/CodebyKami/taskflow-manager)

</div>
