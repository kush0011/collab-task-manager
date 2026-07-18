import express, { Router } from 'express'
import { AuthRequest, authMiddleware } from '../middleware/auth.js'
import { TaskService } from '../services/taskService.js'

const router: Router = express.Router()

// Get all tasks for a project
router.get('/project/:projectId', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { projectId } = req.params
    const tasks = await TaskService.getProjectTasks(projectId)
    res.json(tasks)
  } catch (error) {
    console.error('Error fetching tasks:', error)
    res.status(500).json({ error: 'Failed to fetch tasks' })
  }
})

// Get single task
router.get('/:taskId', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { taskId } = req.params
    const task = await TaskService.getTask(taskId)
    if (!task) {
      return res.status(404).json({ error: 'Task not found' })
    }
    res.json(task)
  } catch (error) {
    console.error('Error fetching task:', error)
    res.status(500).json({ error: 'Failed to fetch task' })
  }
})

// Create a new task
router.post('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const taskData = req.body
    const task = await TaskService.createTask({
      ...taskData,
      createdBy: req.userId,
    })
    res.status(201).json(task)
  } catch (error) {
    console.error('Error creating task:', error)
    res.status(500).json({ error: 'Failed to create task' })
  }
})

// Update a task
router.put('/:taskId', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { taskId } = req.params
    const updates = req.body
    const task = await TaskService.updateTask(taskId, updates)
    if (!task) {
      return res.status(404).json({ error: 'Task not found' })
    }
    res.json(task)
  } catch (error) {
    console.error('Error updating task:', error)
    res.status(500).json({ error: 'Failed to update task' })
  }
})

// Delete a task
router.delete('/:taskId', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { taskId } = req.params
    await TaskService.deleteTask(taskId)
    res.json({ message: 'Task deleted successfully' })
  } catch (error) {
    console.error('Error deleting task:', error)
    res.status(500).json({ error: 'Failed to delete task' })
  }
})

export default router
