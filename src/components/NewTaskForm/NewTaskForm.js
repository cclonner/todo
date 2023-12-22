import React, { useState } from 'react'

function NewTaskForm({ onAddTask }) {
  const [newTask, setNewTask] = useState('')

  const handleInputChange = (e) => {
    setNewTask(e.target.value)
  }

  const handleAddTask = (e) => {
    if ((e.key === 'Enter' || e.type === 'click') && newTask.trim() !== '') {
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
        onKeyPress={handleAddTask}
        autoFocus
      />
      <button className="icon icon-add" onClick={handleAddTask} />
    </header>
  )
}

export default NewTaskForm
