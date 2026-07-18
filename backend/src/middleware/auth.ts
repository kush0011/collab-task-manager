import { Request, Response, NextFunction } from 'express'
import { auth } from '../config/firebase.js'

export interface AuthRequest extends Request {
  userId?: string
  user?: any
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1]

    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const decodedToken = await auth.verifyIdToken(token)
    req.userId = decodedToken.uid
    req.user = decodedToken
    next()
  } catch (error) {
    console.error('Auth middleware error:', error)
    res.status(401).json({ error: 'Unauthorized' })
  }
}
