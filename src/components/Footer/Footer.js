import React from 'react'

import TasksFilter from '../TasksFilter'

function Footer({ itemsLeft, onClearCompleted, activeFilter, onFilterChange }) {
  return (
    <footer className="footer">
      <span className="todo-count">{`${itemsLeft} ${itemsLeft === 1 ? 'item' : 'items'} left`}</span>
      <TasksFilter activeFilter={activeFilter} onFilterChange={onFilterChange} />
      <button className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
