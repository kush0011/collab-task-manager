# 🚀 Collab Task Manager

A **real-time collaborative task management platform** built with React, Node.js, and Firebase. Teams can create projects, assign tasks, collaborate in real-time, and manage workflows seamlessly.

## ✨ Features

- **Real-Time Collaboration** - Live updates using WebSockets (Socket.io)
- **Task Management** - Create, update, delete tasks with priorities and due dates
- **Project Organization** - Organize tasks by projects
- **Team Management** - Invite team members and assign tasks
- **Advanced Search & Filtering** - Filter by status, priority, assignee, and date range
- **File Uploads** - Attach files to tasks (Firebase Storage)
- **Comments & Notifications** - Real-time commenting with live notifications
- **Responsive Design** - Mobile-first UI with Tailwind CSS
- **User Authentication** - Secure login with Firebase Auth

## 🛠️ Tech Stack

### Frontend
- React 18 + TypeScript
- Tailwind CSS for styling
- Socket.io-client for real-time updates
- Firebase SDK for authentication & storage
- Zustand for state management

### Backend
- Node.js + Express.js
- Socket.io for real-time communication
- Firebase Admin SDK
- CORS enabled for frontend communication

### Database & Storage
- Firebase Firestore (NoSQL database)
- Firebase Storage (file uploads)
- Firebase Authentication

## 📁 Project Structure

```
collab-task-manager/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── store/           # Zustand stores
│   │   ├── services/        # API & Firebase services
│   │   ├── hooks/           # Custom hooks
│   │   ├── types/           # TypeScript interfaces
│   │   └── App.tsx          # Main app component
│   ├── package.json
│   └── tailwind.config.js
│
├── backend/                  # Node.js server
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── controllers/      # Business logic
│   │   ├── middleware/       # Custom middleware
│   │   ├── services/         # Firebase services
│   │   ├── types/            # TypeScript interfaces
│   │   └── index.ts          # Server entry point
│   ├── package.json
│   └── .env.example
│
├── docs/                     # Documentation
└── .gitignore
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- Firebase project created (get credentials)
- Git installed

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kush0011/collab-task-manager.git
   cd collab-task-manager
   ```

2. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   cp .env.example .env.local
   # Add your Firebase credentials to .env.local
   npm run dev
   ```

3. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Add your Firebase service account key to .env
   npm run dev
   ```

4. **Open browser** - http://localhost:3000

## 📚 API Documentation

See [docs/API.md](docs/API.md) for detailed API endpoints.

## 🔌 Real-Time Events

See [docs/SOCKET_EVENTS.md](docs/SOCKET_EVENTS.md) for Socket.io events.

## 🎯 Features Roadmap

- [ ] Task templates
- [ ] Recurring tasks
- [ ] Time tracking
- [ ] Activity timeline
- [ ] Export to PDF
- [ ] Email notifications
- [ ] Team workspaces
- [ ] Dark mode

## 📄 License

MIT

## 👤 Author

**Kushagra** - [GitHub](https://github.com/kush0011)

---

Built with ❤️ for full-stack developers
