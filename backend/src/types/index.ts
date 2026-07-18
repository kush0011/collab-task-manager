// User types
export interface User {
  id: string
  email: string
  displayName: string
  photoURL?: string
  createdAt: Date
}

// Task types
export interface Task {
  id: string
  projectId: string
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  assigneeId: string
  dueDate?: Date
  createdBy: string
  createdAt: Date
  updatedAt: Date
  attachments: Attachment[]
  comments: Comment[]
}

// Project types
export interface Project {
  id: string
  name: string
  description: string
  owner: string
  members: string[]
  createdAt: Date
  updatedAt: Date
}

// Comment types
export interface Comment {
  id: string
  taskId: string
  userId: string
  content: string
  createdAt: Date
  updatedAt: Date
}

// Attachment types
export interface Attachment {
  id: string
  taskId: string
  fileName: string
  fileUrl: string
  fileSize: number
  uploadedAt: Date
}

// Socket types
export interface SocketUser {
  userId: string
  projectId: string
  socketId: string
  status: 'active' | 'idle'
}
