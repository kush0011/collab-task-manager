import { formatDistanceToNow, format } from 'date-fns'

export const formatDate = (date: Date): string => {
  return format(new Date(date), 'MMM dd, yyyy')
}

export const formatDateTime = (date: Date): string => {
  return format(new Date(date), 'MMM dd, yyyy HH:mm')
}

export const formatRelativeTime = (date: Date): string => {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export const isOverdue = (date: Date): boolean => {
  return new Date(date) < new Date()
}

export const isToday = (date: Date): boolean => {
  const today = new Date()
  const checkDate = new Date(date)
  return (
    today.getFullYear() === checkDate.getFullYear() &&
    today.getMonth() === checkDate.getMonth() &&
    today.getDate() === checkDate.getDate()
  )
}
