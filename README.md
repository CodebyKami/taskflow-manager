# TaskFlow Manager - Enterprise Edition

> **🚀 Enterprise-Level Project Management System**  
> Built with React, TypeScript, Tailwind CSS, Zustand, React Query, and Shadcn UI

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/CodebyKami/taskflow-manager)

---

## ✨ Enterprise Features

### 🎯 Core Functionality
- **Advanced Authentication** - Secure login/signup with role-based access (Admin, Manager, Developer, Designer, Client)
- **Project Management** - Complete CRUD operations with status tracking, budgets, and progress monitoring
- **Task Management** - Kanban boards with drag-and-drop, priorities, assignments, and subtasks
- **Team Collaboration** - User management, team assignments, and role-based permissions
- **Time Tracking** - Log hours, track billable time, and generate timesheets
- **Calendar Integration** - Visual timeline of tasks, deadlines, and milestones
- **Advanced Analytics** - Charts, reports, and insights with Recharts
- **Real-time Updates** - Instant synchronization across all views

### 🎨 UI/UX Excellence
- **Modern Design System** - Built with Tailwind CSS and Shadcn UI components
- **Dark Mode Support** - Seamless theme switching
- **Responsive Design** - Perfect on desktop, tablet, and mobile
- **Smooth Animations** - Framer Motion for delightful interactions
- **Accessible** - WCAG 2.1 compliant with Radix UI primitives

### 🛠️ Technical Stack

**Frontend Framework:**
- ⚛️ React 18 with TypeScript
- ⚡ Vite for blazing-fast builds
- 🎨 Tailwind CSS for styling
- 🧩 Shadcn UI component library

**State Management:**
- 🐻 Zustand for global state
- 🔄 React Query for server state
- 💾 LocalStorage persistence

**UI Components:**
- 📦 Radix UI primitives
- 🎭 Framer Motion animations
- 📊 Recharts for data visualization
- 🎯 React Beautiful DnD for drag-and-drop

**Form & Validation:**
- 📝 React Hook Form
- ✅ Zod schema validation

**Utilities:**
- 📅 date-fns for date manipulation
- 🎨 clsx & tailwind-merge for className management
- 🔔 Sonner for toast notifications

---

## 🚀 Quick Start

### Prerequisites
```bash
Node.js 18+ and npm/yarn/pnpm
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/CodebyKami/taskflow-manager.git
cd taskflow-manager
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open your browser**
```
http://localhost:3000
```

### Demo Credentials
```
Email: admin@taskflow.com
Password: admin123
```

---

## 📦 Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist` directory.

---

## 🌐 Deploy to Vercel

### Option 1: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/CodebyKami/taskflow-manager)

### Option 2: Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option 3: GitHub Integration
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Click "Deploy" (auto-configured!)

---

## 🎯 Key Features

### 1. Dashboard
- Overview Statistics
- Recent Activity
- Quick Actions
- Progress Tracking

### 2. Project Management
- Create & Edit Projects
- Status Tracking
- Budget Management
- Team Assignment
- Progress Monitoring

### 3. Task Management
- Kanban Board with Drag-and-Drop
- Task Details & Comments
- Subtasks
- Priority Levels
- Due Dates
- Time Estimates

### 4. Team Collaboration
- User Profiles
- Role Management
- Activity Feed
- @Mentions

### 5. Time Tracking
- Log Hours
- Timesheets
- Billable Hours
- Reports

### 6. Calendar
- Task Timeline
- Deadline Tracking
- Milestone View

### 7. Reports & Analytics
- Project Reports
- Team Performance
- Budget Analysis
- Time Reports
- Custom Charts

---

## 📁 Project Structure

```
taskflow-manager/
├── src/
│   ├── components/ui/       # Reusable UI components
│   ├── layouts/             # Layout components
│   ├── pages/               # Page components
│   ├── store/               # State management
│   ├── lib/                 # Utilities
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

---

## 🎨 Customization

### Theme Colors
Edit `tailwind.config.js` to customize colors.

### Components
All UI components are in `src/components/ui/` and fully customizable.

---

## 📝 Environment Variables

Create a `.env` file:

```env
VITE_APP_NAME=TaskFlow Manager
VITE_APP_VERSION=2.0.0
```

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

MIT License - see LICENSE file for details.

---

## 🙏 Acknowledgments

- React, TypeScript, Vite
- Tailwind CSS, Shadcn UI
- Zustand, React Query
- Radix UI, Lucide Icons

---

<div align="center">

**Built with ❤️ for modern teams**

[⭐ Star on GitHub](https://github.com/CodebyKami/taskflow-manager) | [🐛 Report Bug](https://github.com/CodebyKami/taskflow-manager/issues) | [💡 Request Feature](https://github.com/CodebyKami/taskflow-manager/issues)

</div>
