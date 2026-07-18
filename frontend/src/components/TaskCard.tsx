import React from 'react'
import { Task } from '../types'
import { Calendar, Flag, User, FileIcon } from 'lucide-react'
import { formatDate } from '../utils/dateUtils'

interface TaskCardProps {
  task: Task
  onClick: (task: Task) => void
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  }

  const statusColors = {
    'todo': 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    'completed': 'bg-green-100 text-green-800',
  }

  return (
    <div
      onClick={() => onClick(task)}
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-900 flex-1 line-clamp-2">{task.title}</h3>
        <span className={`px-2 py-1 rounded text-xs font-medium ml-2 ${statusColors[task.status]}`}>
          {task.status}
        </span>
      </div>

      <p className="text-gray-600 text-sm line-clamp-2 mb-3">{task.description}</p>

      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${priorityColors[task.priority]}`}>
          <Flag size={12} />
          {task.priority}
        </span>
      </div>

      <div className="flex justify-between items-center text-xs text-gray-500">
        <div className="flex items-center gap-1">
          {task.dueDate && (
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              {formatDate(task.dueDate)}
            </div>
          )}
        </div>
        {task.attachments && task.attachments.length > 0 && (
          <div className="flex items-center gap-1">
            <FileIcon size={14} />
            {task.attachments.length}
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskCard
