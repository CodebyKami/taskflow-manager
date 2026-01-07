# TaskFlow Manager

A modern, powerful task management application built with React. Manage your tasks efficiently with a beautiful Kanban board interface, track your productivity with analytics, and stay organized.

## ✨ Features

- 🔐 **User Authentication** - Secure login and signup with local storage
- 📋 **Kanban Board** - Drag and drop tasks between columns (To Do, In Progress, Done)
- 📊 **Analytics Dashboard** - Track completion rates, priority breakdown, and recent tasks
- 🎨 **Modern UI** - Beautiful dark theme with smooth animations
- 💾 **Local Storage** - All data persists in your browser
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- ⚡ **Fast & Lightweight** - Built with Vite for optimal performance

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/CodebyKami/taskflow-manager.git
cd taskflow-manager
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 📦 Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## 🌐 Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Vite and configure everything
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
npm install -g vercel
vercel
```

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons
- **CSS3** - Styling with CSS variables

## 📱 Features in Detail

### Authentication
- Create an account with name, email, and password
- Secure login system
- Data isolation per user
- Persistent sessions

### Kanban Board
- Three columns: To Do, In Progress, Done
- Drag and drop tasks between columns
- Create, edit, and delete tasks
- Priority levels: High, Medium, Low
- Task descriptions and metadata

### Analytics
- Completion rate tracking
- Task status breakdown
- Priority distribution charts
- Recent tasks timeline
- Visual progress indicators

## 🎨 Customization

The app uses CSS variables for easy theming. Edit `src/index.css` to customize colors:

```css
:root {
  --primary: #6366f1;
  --secondary: #8b5cf6;
  --success: #10b981;
  /* ... more variables */
}
```

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📧 Support

For support, email support@taskflow.com or open an issue on GitHub.

---

Built with ❤️ using React and Vite
