import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import dotenv from 'dotenv'
import taskRoutes from './routes/tasks.js'
import { SocketService } from './services/socketService.js'

dotenv.config()

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
})

const socketService = new SocketService(io)

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/tasks', taskRoutes)

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() })
})

// Socket.io events
io.on('connection', (socket: any) => {
  console.log('User connected:', socket.id)

  // Join project room
  socket.on('join:project', (projectId: string, userId: string) => {
    socket.join(`project:${projectId}`)
    socket.join(`user:${userId}`)
    socketService.registerUser(socket.id, userId, projectId)
    console.log(`User ${userId} joined project ${projectId}`)
  })

  // Handle task updates
  socket.on('task:update', (data: any) => {
    socketService.emitTaskUpdate(data.projectId, data.task)
  })

  // Handle task comments
  socket.on('task:comment', (data: any) => {
    socketService.emitTaskComment(data.projectId, data.comment)
  })

  // Handle disconnection
  socket.on('disconnect', () => {
    socketService.unregisterUser(socket.id)
    console.log('User disconnected:', socket.id)
  })
})

// Error handling
app.use((err: any, req: any, res: any, next: any) => {
  console.error('Error:', err)
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' })
})

const PORT = process.env.PORT || 5000
httpServer.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`)
  console.log(`📡 Socket.io server ready for connections\n`)
})
