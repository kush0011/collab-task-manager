import { Server, Socket } from 'socket.io'
import { SocketUser } from '../types/index.js'

export class SocketService {
  private io: Server
  private userMap: Map<string, SocketUser> = new Map()

  constructor(io: Server) {
    this.io = io
  }

  // Register user presence
  registerUser(socketId: string, userId: string, projectId: string): void {
    const user: SocketUser = {
      userId,
      projectId,
      socketId,
      status: 'active',
    }
    this.userMap.set(socketId, user)
    this.broadcastUserPresence(projectId)
  }

  // Unregister user
  unregisterUser(socketId: string): void {
    const user = this.userMap.get(socketId)
    if (user) {
      this.userMap.delete(socketId)
      this.broadcastUserPresence(user.projectId)
    }
  }

  // Get active users in project
  getProjectUsers(projectId: string): SocketUser[] {
    return Array.from(this.userMap.values()).filter((u) => u.projectId === projectId)
  }

  // Broadcast user presence
  private broadcastUserPresence(projectId: string): void {
    const users = this.getProjectUsers(projectId)
    this.io.to(`project:${projectId}`).emit('user:presence:update', users)
  }

  // Emit task update to project
  emitTaskUpdate(projectId: string, task: any): void {
    this.io.to(`project:${projectId}`).emit('task:updated', task)
  }

  // Emit task comment
  emitTaskComment(projectId: string, comment: any): void {
    this.io.to(`project:${projectId}`).emit('task:commented', comment)
  }

  // Emit notification
  emitNotification(userId: string, notification: any): void {
    this.io.to(`user:${userId}`).emit('notification', notification)
  }
}
