import { db } from '../config/firebase.js'
import { Task } from '../types/index.js'
import { v4 as uuidv4 } from 'uuid'

const TASKS_COLLECTION = 'tasks'

export class TaskService {
  // Get all tasks for a project
  static async getProjectTasks(projectId: string): Promise<Task[]> {
    try {
      const snapshot = await db.collection(TASKS_COLLECTION).where('projectId', '==', projectId).get()
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as Task))
    } catch (error) {
      console.error('Error fetching tasks:', error)
      return []
    }
  }

  // Create a new task
  static async createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    try {
      const taskId = uuidv4()
      const now = new Date()
      const newTask = {
        ...task,
        id: taskId,
        createdAt: now,
        updatedAt: now,
      }
      await db.collection(TASKS_COLLECTION).doc(taskId).set(newTask)
      return newTask as Task
    } catch (error) {
      console.error('Error creating task:', error)
      throw error
    }
  }

  // Update a task
  static async updateTask(taskId: string, updates: Partial<Task>): Promise<Task | null> {
    try {
      const now = new Date()
      await db.collection(TASKS_COLLECTION).doc(taskId).update({
        ...updates,
        updatedAt: now,
      })
      const doc = await db.collection(TASKS_COLLECTION).doc(taskId).get()
      return (doc.data() as Task) || null
    } catch (error) {
      console.error('Error updating task:', error)
      throw error
    }
  }

  // Delete a task
  static async deleteTask(taskId: string): Promise<void> {
    try {
      await db.collection(TASKS_COLLECTION).doc(taskId).delete()
    } catch (error) {
      console.error('Error deleting task:', error)
      throw error
    }
  }

  // Get a single task
  static async getTask(taskId: string): Promise<Task | null> {
    try {
      const doc = await db.collection(TASKS_COLLECTION).doc(taskId).get()
      return (doc.data() as Task) || null
    } catch (error) {
      console.error('Error fetching task:', error)
      return null
    }
  }
}
