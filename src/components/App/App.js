import React, { useState } from 'react'

import NewTaskForm from '../NewTaskForm'
import TasksList from '../TasksList'
import Footer from '../Footer'

function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')

  const addTask = (description) => {
    const newTask = {
      id: Date.now(),
      description,
      created: new Date(),
      completed: false,
    }
    setTasks((prevTasks) => [...prevTasks, newTask])
  }

  const editTask = (taskId, newDescription) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, description: newDescription } : task))
    )
  }

  const toggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task))
    )
  }

  function deleteTask(taskId) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
  }

  const clearCompleted = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed))
  }

  const itemsLeft = tasks.filter((task) => !task.completed).length

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  return (
    <section className="todoapp">
      <NewTaskForm onAddTask={addTask} />
      <section className="main">
        <TasksList tasks={filteredTasks} onToggle={toggleTask} onDelete={deleteTask} onEdit={editTask} />
        <Footer itemsLeft={itemsLeft} onClearCompleted={clearCompleted} onFilterChange={setFilter} />
      </section>
    </section>
  )
}

export default App
