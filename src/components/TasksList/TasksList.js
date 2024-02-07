import React from 'react'

import Task from '../Task'

function TasksList({ tasks, onToggle, onDelete, onEdit, onUpdate }) {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} onUpdate={onUpdate} />
      ))}
    </ul>
  )
}

export default TasksList
