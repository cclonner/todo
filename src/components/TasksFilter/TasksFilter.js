import React from 'react'

function TasksFilter({ activeFilter, onFilterChange }) {
  const handleFilterChange = (filter) => {
    onFilterChange(filter)
  }

  return (
    <ul className="filters">
      <li>
        <button onClick={() => handleFilterChange('all')} className={activeFilter === 'all' ? 'selected' : ''}>
          All
        </button>
      </li>
      <li>
        <button onClick={() => handleFilterChange('active')} className={activeFilter === 'active' ? 'selected' : ''}>
          Active
        </button>
      </li>
      <li>
        <button
          onClick={() => handleFilterChange('completed')}
          className={activeFilter === 'completed' ? 'selected' : ''}
        >
          Completed
        </button>
      </li>
    </ul>
  )
}

export default TasksFilter
