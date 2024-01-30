import React, { useState } from 'react'

function NewTaskForm({ onAddTask }) {
  const [newTask, setNewTask] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const handleInputChange = (e) => {
    setNewTask(e.target.value)
  }

  const handleMinChange = (e) => {
    setMin(e.target.value)
  }

  const handleSecChange = (e) => {
    setSec(e.target.value)
  }

  const handleAddTask = (e) => {
    if ((e.key === 'Enter' || e.type === 'click') && newTask.trim() !== '') {
      onAddTask(newTask, min, sec)
      setNewTask('')
      setMin('')
      setSec('')
    }
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form">
        <input
          className="new-todo"
          placeholder="Task"
          value={newTask}
          onChange={handleInputChange}
          onKeyDown={handleAddTask}
          autoFocus
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          value={min}
          onChange={handleMinChange}
          onKeyDown={handleAddTask}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          value={sec}
          onChange={handleSecChange}
          onKeyDown={handleAddTask}
        />
      </form>
    </header>
  )
}

export default NewTaskForm
