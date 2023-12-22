import React, { useState } from 'react'

function NewTaskForm({ onAddTask }) {
  const [newTask, setNewTask] = useState('')

  const handleInputChange = (e) => {
    setNewTask(e.target.value)
  }

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      onAddTask(newTask)
      setNewTask('')
    }
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={newTask}
        onChange={handleInputChange}
        onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
        autoFocus
      />
    </header>
  )
}

export default NewTaskForm
