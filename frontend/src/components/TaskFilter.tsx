import React, { useState } from 'react'
import { TaskFilters } from '../types'
import { Search, X } from 'lucide-react'

interface TaskFilterProps {
  onFilter: (filters: TaskFilters) => void
  onClear: () => void
}

const TaskFilter: React.FC<TaskFilterProps> = ({ onFilter, onClear }) => {
  const [filters, setFilters] = useState<TaskFilters>({})
  const [searchQuery, setSearchQuery] = useState('')

  const handleStatusChange = (status: string) => {
    const newFilters = { ...filters }
    if (!newFilters.status) newFilters.status = []

    if (newFilters.status.includes(status)) {
      newFilters.status = newFilters.status.filter((s) => s !== status)
    } else {
      newFilters.status.push(status)
    }

    setFilters(newFilters)
    onFilter(newFilters)
  }

  const handlePriorityChange = (priority: string) => {
    const newFilters = { ...filters }
    if (!newFilters.priority) newFilters.priority = []

    if (newFilters.priority.includes(priority)) {
      newFilters.priority = newFilters.priority.filter((p) => p !== priority)
    } else {
      newFilters.priority.push(priority)
    }

    setFilters(newFilters)
    onFilter(newFilters)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    const newFilters = { ...filters, searchQuery: query }
    setFilters(newFilters)
    onFilter(newFilters)
  }

  const handleClear = () => {
    setFilters({})
    setSearchQuery('')
    onClear()
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
      {/* Search */}
      <div className="relative">
        <Search size={18} className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Status Filter */}
      <div>
        <h3 className="font-semibold text-sm text-gray-900 mb-2">Status</h3>
        <div className="flex flex-wrap gap-2">
          {['todo', 'in-progress', 'completed'].map((status) => (
            <button
              key={status}
              onClick={() => handleStatusChange(status)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filters.status?.includes(status)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Priority Filter */}
      <div>
        <h3 className="font-semibold text-sm text-gray-900 mb-2">Priority</h3>
        <div className="flex flex-wrap gap-2">
          {['low', 'medium', 'high'].map((priority) => (
            <button
              key={priority}
              onClick={() => handlePriorityChange(priority)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filters.priority?.includes(priority)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {priority}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {(filters.status?.length || filters.priority?.length || searchQuery) && (
        <button
          onClick={handleClear}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <X size={16} />
          Clear all filters
        </button>
      )}
    </div>
  )
}

export default TaskFilter
